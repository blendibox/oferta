'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import slugify from 'slugify';
import Image from 'next/image';
import Link from 'next/link';
import VideoBubble from './VideoBubble'


// Utilitário para tratar preço em diferentes formatos
function extrairPreco(valor) {
  if (!valor) return '0';
  if (typeof valor === 'object' && valor.$) return valor.$;
  if (typeof valor === 'number') return valor.toString();
  return valor;
}

function normalizarParaComparacao(str) {
  return str
    .normalize('NFD')                     // remove acentos
    .replace(/[\u0300-\u036f]/g, '')      // remove marcas diacríticas
    .replace(/-/g, ' ')                   // converte hífen em espaço
    .replace(/\s+/g, ' ')                 // colapsa múltiplos espaços
    .trim()                               // remove espaços das bordas
    .toLowerCase();                       // padroniza para minúsculas
}

function deslugify(slug) {
	
 // Lista de termos que devem manter o hífen
  const manterHifen = ['anti-idade', 'auto-estima', 'pos-sol', 'meia-calça', 'leave-in','pos-barba','leave-in e creme para pentear'];
  const preposicoesMinusculas = ['de', 'da', 'do', 'das', 'dos', 'para', 'e'];
  const conectores = { and: '&' };
  
    if (manterHifen.includes(slug)) {
		return slug
		  .split('-')
		  .map((palavra, i) => {
			  if (conectores[palavra]) return conectores[palavra];
			  if (preposicoesMinusculas.includes(palavra) && i !== 0) return palavra;
			  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
			})
		  .join('-'); // mantém o hífen
	  }

  return slug
    .split('-')
    .map((palavra, i) => {
      if (conectores[palavra]) return conectores[palavra];
      if (preposicoesMinusculas.includes(palavra) && i !== 0) return palavra;
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
  
}

function buscarCategoriaPorSlug(slugArray, categorias, caminho = []) {
  for (const [nome, dados] of Object.entries(categorias)) {
    const slugCompleto = dados.slug || [...caminho, nome.toLowerCase()].join('/');
    if (slugCompleto === slugArray.join('/')) return dados;

    if (dados.subcategorias) {
      const resultado = buscarCategoriaPorSlug(slugArray, dados.subcategorias, [...caminho, nome.toLowerCase()]);
      if (resultado) return resultado;
    }
  }
  return null;
}


export default function ResultadosFiltrados() {
  const pathname = usePathname();
  const slugAtual = pathname.replace(/^\/categoria\//, '').split('/').filter(Boolean);
  const caminhoCategoria = slugAtual
  .map(slug => deslugify(slug))
  .join(' > ')
  .toLowerCase();

  const [categorias, setCategorias] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [marca, setMarca] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itensPorPagina = 12;
  

  // 🔄 Busca o JSON de categorias
  useEffect(() => {
	  
    fetch('/categorias.json')
      .then(res => res.json())
      .then(setCategorias)
      .catch(err => console.error('Erro ao carregar categorias.json', err));
  }, []);

  // 🔍 Localiza categoria pelo slug
 const categoriaSelecionada = useMemo(() => {
  return buscarCategoriaPorSlug(slugAtual, categorias);
}, [categorias, slugAtual]);

  // 📦 Carrega os produtos dos arquivos relevantes
  useEffect(() => {
    async function carregarProdutos() {
      setCarregando(true);
        if (!categoriaSelecionada || !categoriaSelecionada.arquivos) {
		  setProdutos([]);
		  setCarregando(false);
		  return;
		}

      const arquivos = categoriaSelecionada.arquivos;
      const todos = [];

	  const arquivosValidos = arquivos.filter(
		  nome => !['CUPOM.json', 'PROMO.json'].includes(nome.toUpperCase())
		);

		for (const nome of arquivosValidos) {
		  try {
			const res = await fetch(`/data/${nome}`);
			const json = await res.json();
			const nomeMarca = nome.replace('.json', '').toLowerCase();
			const normalizados = json.map((p) => {
				// Galvic: detecta se é o formato com "g:title"
				const isGalvic = !!p['g:title'];
				
				const precoBruto = isGalvic
				  ? extrairPreco(p['g:price'])
				  : extrairPreco(p?.price?.buynow);
			  
			    const categoriaTexto = isGalvic
				  ? '' // ou p['g:categoria'] se existir
				  : (p?.cat?.mCat || '').toLowerCase();

				const padronizado = {
					nome: isGalvic ? p['g:title'] : p?.text?.name || '',
					preco: parseFloat(
						precoBruto.replace(/[^\d,.-]/g, '').replace(',', '.')
					  ),
					imagem: isGalvic ? p['g:image_link'] : p?.uri?.mImage,
					slug: p.slug || '',
					link: isGalvic ? p['link'] || p['aw_deep_link'] : p?.uri?.mLink || p?.uri?.awTrack,
					marca: isGalvic ? p['g:brand'] : nomeMarca,
					origem: nomeMarca,
					categoria: categoriaTexto
				  };

				return { ...p, _padronizado: padronizado };
		   })
		     // 🧠 Aqui está o filtro por categoria!
            .filter(p =>
			  normalizarParaComparacao(p._padronizado?.categoria || '').startsWith(normalizarParaComparacao(caminhoCategoria))
			);
		   ;

		   todos.push(...normalizados);
		  } catch (e) {
			console.warn(`Erro ao carregar ${nome}:`, e.message);
		  }
		}// END FOR

      setProdutos(todos);
      setCarregando(false);
    }

    carregarProdutos();
  }, [categoriaSelecionada]);

  // 🧠 Marcas únicas
	const marcasDisponiveis = useMemo(() => {
	  const marcas = new Set();
	  produtos.forEach(p => {
		const m = p._padronizado?.marca;
		if (m) marcas.add(m);
	  });
	  return Array.from(marcas).sort();
	}, [produtos]);

  // 🎯 Filtro de produtos
 const produtosFiltrados = useMemo(() => {
  return produtos.filter(p => {
    const precoBruto = p._padronizado?.preco || 0;
    const precoOk =
      (!minPrice || precoBruto >= parseFloat(minPrice)) &&
      (!maxPrice || precoBruto <= parseFloat(maxPrice));
    const marcaOk = !marca || p._padronizado?.marca === marca;
    return precoOk && marcaOk;
  });
}, [produtos, minPrice, maxPrice, marca]);

  // 🧮 Paginação
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
  const inicio = (currentPage - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosVisiveis = produtosFiltrados.slice(inicio, fim);

  useEffect(() => setCurrentPage(1), [minPrice, maxPrice, marca]);

  if (!slugAtual.length) return null;
  
  
  if (!categoriaSelecionada) {
  return <p className="p-6 text-center text-gray-500"></p>;
}

/*
console.log('📂 URL slugAtual:', slugAtual);
console.log('📁 Todas categorias:', categorias);
console.log('🔍 Categoria encontrada:', categoriaSelecionada);
console.log('🔍 caminhoCategoria encontrada:', caminhoCategoria);

*/
  return (
    <div className="mt-6">
   
        <VideoBubble title="Nome do Produto | 3em1_puffer" />
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <label htmlFor='minimo' className="mt-2">Preço mínimo:</label>
		<input
		  id='minimo'
          type="number"
		   size="10"
          placeholder="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-emerald-700 px-3 py-1 rounded bg-white"
        />
		<label htmlFor='maximo' className="mt-2">Preço máximo:</label>
        <input
		 id='maximo'
          type="number"
		  size="10"
          placeholder="9999"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-emerald-700 px-3 py-1 rounded bg-white"
        />
			<label htmlFor='marca' className="mt-2">Marca:</label>
        <select
		  id='marca'
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="border border-emerald-700 px-3 py-1 rounded bg-white"
        >
          {marcasDisponiveis.map((m) => (
            <option key={m} value={m}>
			  {m.charAt(0).toUpperCase() + m.slice(1)}
			</option>
          ))}
        </select>
      </div>

      {/* Lista de produtos */}
      {carregando ? (
        <p>Carregando produtos...</p>
      ) : produtosVisiveis.length === 0 ? (
        <p>Nenhum produto encontrado com os filtros aplicados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
			{produtosVisiveis.map((p, i) => (
			  <div key={p.slug || i} className="bg-white p-4 rounded shadow hover:shadow-md transition">
				<Link
					  href={p._padronizado?.link}>
				<Image
				  src={p._padronizado?.imagem}
				  alt={p._padronizado?.nome}
				  width={400}
				  height={400}
				  className="w-full h-48 object-cover mb-2 rounded saturate-[1.08] contrast-[1.08]"
				/>
				</Link>
				<h3 className="font-bold text-lg">{p._padronizado?.nome}</h3>
				<p className="text-sm text-gray-600">
				  R$ {p._padronizado?.preco?.toFixed(2)}
				</p>

				<Link alt="ir para loja {p._padronizado?.marca}"
					  href={p._padronizado?.link}
					  className="ml-2 p-2 text-white bg-emerald-700 rounded text-sm mt-2 inline-block hover:bg-emerald-500"
					>
				  Ver Produto
				</Link>
			  </div>
			))}
        </div>
      )}

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1  border-emerald-700 rounded border ${
                currentPage === num ? 'bg-emerald-700 text-white' : 'bg-white text-emerald-700'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
