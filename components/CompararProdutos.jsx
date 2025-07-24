'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from  './FallbackImage';
import SchemaCategoria from './SchemaCategoria';

function normalizarTexto(texto) {
  return texto
    .normalize('NFD') // remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-/g, ' ') // troca hífen por espaço
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove pontuação
    .toLowerCase();
}

// Utilitário para tratar preço em diferentes formatos
function extrairPreco(valor) {
  if (!valor) return '0';
  if (typeof valor === 'object' && valor.$) return valor.$;
  if (typeof valor === 'number') return valor.toString();
  return valor;
}



export default function CompararProdutos() {
	
  const searchParams = useSearchParams();
  const parametroBusca = searchParams.get('busca') || searchParams.keys().next().value || ''; // suporta ?busca=nike ou ?mizuno	
	
  const [busca, setBusca] = useState(parametroBusca || 'cupom');
  const [resultados, setResultados] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [slugIndex, setSlugIndex] = useState({});
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef(null);
  
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 9;
  
  useEffect(() => {
  if (busca?.length >= 3 && slugIndex) {
    buscarProdutos(busca);
  }
}, [busca, slugIndex]);


  // Carrega índice de slugs
  useEffect(() => {
    fetch('/slug-index.json')
      .then(res => res.json())
      .then(setSlugIndex);
  }, []);

  const buscarProdutos = async (termo) => {
    setLoading(true);
	const termoNormalizado = normalizarTexto(termo);
	const palavrasBusca = termoNormalizado.split(/\s+/);

	const slugsEncontrados = Object.keys(slugIndex).filter((slug) => {
	  const slugNormalizado = normalizarTexto(slug);
	  return palavrasBusca.every(palavra => slugNormalizado.includes(palavra));
	})
	.slice(0, 60);
	

	  // Paginação: monta a página corrente dos resultados
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginaResultados = resultados.slice(inicio, fim);
	

    const arquivosUnicos = [...new Set(slugsEncontrados.map(slug => slugIndex[slug]))];

    const produtos = [];

    for (const arquivo of arquivosUnicos) {
      const caminho =
        arquivo.startsWith('ofertas_') ?
        `/data/produtos/${arquivo}` :
        `/data/${arquivo}`;

      try {
        const res = await fetch(caminho);
        const json = await res.json();

        for (const slug of slugsEncontrados) {
          const produto = json.find(p =>
            (p.slug || p['g:id'] || '').toLowerCase() === slug
          );

          if (produto) {
			const origem =  arquivo.replace('.json', '').toLowerCase();  
			
			// Galvic: detecta se é o formato com "g:title"
				const isGalvic = !!produto['g:title'];
				
				const precoBruto = isGalvic
				  ? extrairPreco(produto['g:price'])
				  : extrairPreco(produto?.price?.buynow);
			  
			  let categoriaTexto = isGalvic
				  ? '' // ou p['g:categoria'] se existir
				  : (produto?.cat?.mCat || '').toLowerCase();
				  
				 categoriaTexto =  arquivo.startsWith('VOUCHER')? produto?.categories : "";
				  
			
            let marca =  arquivo.startsWith('ofertas_') ? "" : arquivo.replace('.json', '').toLowerCase();
			    marca =  arquivo.startsWith('CUPOM')? produto.store?.name: marca ;
			    marca =  arquivo.startsWith('PROMO')? produto.advertisername : marca ;
				marca =  arquivo.startsWith('VOUCHER')? produto.advertiser : marca ;
			
            const nome = produto['g:title'] || produto['title'] || produto.text?.name || produto['offerdescription'] ||  '';
            const preco = parseFloat(
						precoBruto.replace(/[^\d,.-]/g, '').replace(',', '.')
					  );
            const imagem = produto['g:image_link'] || produto['image'] || produto.uri?.mImage ||  '/images/cupons/cupom.png';
            const slugFinal = produto.slug || slug;
			const categoria = categoriaTexto;
			const linkAfilio  =  (produto['uri']?produto['uri']['awTrack']:"") || produto.uri?.awTrack ||  produto.aw_deep_link || produto.deeplink_tracking || produto['aw_deep_link'] || produto['clickurl'] || produto['link'] || '';
            const cupom = produto['code'] || produto['couponcode'] || produto.code || 'Ir para o Site';  
            const link = arquivo.startsWith('ofertas_')
              ? `/produto/${slugFinal}`
              : `/${origem}/${slugFinal}`;
			  console.log(origem);

            produtos.push({
              ...produto,
              _slug: slugFinal,
              _link: link,
              _origem: origem,
			  _marca: marca,
              _titulo: nome,
              _preco: preco,
              _imagem: imagem,
			  _linkAfilio: linkAfilio,
			  _categoria : categoria,
			  _linklocal:`https://comprar.blendibox.com.br/${link}?${marca}`,
			  _cupom: cupom
            });
          }
        }
      } catch (e) {
        console.warn(`❌ Erro ao carregar ${arquivo}:`, e.message);
      }
    }


	setPaginaAtual(1); // sempre volta à primeira página ao buscar
    setResultados(produtos);	
    setLoading(false);
  };
  
  
    // Paginação: monta a página corrente dos resultados
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginaResultados = resultados.slice(inicio, fim);
  

  const handleBusca = (valor) => {
    setBusca(valor);
    clearTimeout(debounceTimer.current);
    if (valor.length >= 3) {
      debounceTimer.current = setTimeout(() => {
        buscarProdutos(valor);
      }, 400);
    } else {
      setResultados([]);
    }
  };

  const toggleSelecionado = (produto) => {
    const id = produto['g:id'] || produto.slug;
    const jaExiste = selecionados.find(p => (p['g:id'] || p.slug) === id);

    if (jaExiste) {
      setSelecionados(selecionados.filter(p => (p['g:id'] || p.slug) !== id));
    } else if (selecionados.length < 3) {
      setSelecionados([...selecionados, produto]);
    }
  };
  
  

  
  

  return (
    <>
    <head>
        <SchemaCategoria produtos={selecionados} />
      </head>
    <div className="p-6 max-w-9/10 mx-auto  ">
	<div id='buscador' className="rounded-xl bg-[url(/images/banner.webp)] bg-fixed bg-center md:bg-cover mb-5 drop-shadow-xl ">
		<div className=" p-6 rounded">
		<div className="bg-white/30 backdrop-blur-md p-5 rounded drop-shadow-xl">
		  <h1 className="text-4xl font-bold mb-3 text-center pt-3  text-sky-950 text-shadow-2xs text-shadow-sky-100">Compare Ofertas <b className="text-pink-400">✱</b></h1>
		  <label className=" text-center text-sky-950 "> <small>Digite sua pesquisa, que pode ser o <b>Nome</b> do <b>Produto</b>, <b>Cupom</b>, ou <b>Marca</b>:</small>
			  <input
				type="text"
				placeholder="Buscar produto por nome..."
				value={busca}
				onChange={(e) => handleBusca(e.target.value)}
				className="  border p-3 mb-3 w-full rounded bg-white text-sky-950 opacity-75 drop-shadow-xl  "
			  />
		   </label>	   
	    </div>
		</div>
    </div>
      {/* Produtos selecionados */}
      {selecionados.length > 0 && (
        <div className="bg-gray-100 p-4 mb-6 rounded">
          <p className="mb-2 text-gray-600">Selecionados para comparação:</p>
		  
           {(() => {
      const precosNumericos = selecionados.map(p =>
        parseFloat(String(p._preco).replace(/[^\d,.-]/g, '').replace(',', '.'))
      );
      const menorPreco = Math.min(...precosNumericos);

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selecionados.map((p, i) => {
            const precoNumerico = parseFloat(
              String(p._preco).replace(/[^\d,.-]/g, '').replace(',', '.')
            );

            return (
              <div key={i} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                <p className="font-bold text-base mb-1">{p._titulo}</p>
                <p className="text-sm text-gray-500 mb-1">
                  {p._marca.toUpperCase()}
                </p>

                <p
                  className={`text-xl font-bold ${
                    precoNumerico === menorPreco
                      ? 'text-emerald-600'
                      : 'text-gray-800'
                  }`}
                >
                  {p._preco ?  'R$ ' +  String(p._preco).replace(/[^\d,.-]/g, '') : ''}
					 <i className="text-sm pb-5"> { precoNumerico === menorPreco?'✱ melhor preço!':''}</i>
					  
                </p>

                <Image
                  src={p._imagem}
                  alt={p._titulo}
				  width={400}
				  height={400}
                  className="w-full h-40 object-contain my-2"
				  blurDataURL={p._imagem}
				  placeholder="blur"
                />

                <Link
                  href={p._linkAfilio || p._linkLocal || "#"}
                  className="text-blue-600 underline text-sm block mt-1"
                  target="_blank"
                >
				<p    className=" text-center border-dashed rounded border-2 text-2xl mask-clip-content inline-flex shrink-0 text-red-500 border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 hover:border-emerald-200 hover:text-white"
                 > {(p._origem =='cupom' || p._origem =='promo' || p._origem =='voucher')?p._cupom:'ver produto'}</p>
                  
                </Link>
                <button
                  onClick={() => toggleSelecionado(p)}
                  className="text-red-600 text-sm mt-2"
                >
                  Remover
                </button>
              </div>
            );
          })}
        </div>
      );
    })()}					
   
		  
        </div>
      )}
	  
	  
	  {selecionados.length >= 2 && (
		  <div className="mb-5 overflow-auto mt-8 border rounded shadow bg-white">
			<table className="table-auto w-full text-sm text-left border-collapse min-w-[600px]">
			  <thead className="bg-gray-100">
				<tr>
				  <th className="p-3 font-semibold text-gray-700 w-40">Atributo</th>
				  {selecionados.map((p, i) => (
					<th key={i} className="p-3 text-center font-bold text-gray-900">
					  Oferta {i + 1}
					</th>
				  ))}
				</tr>
			  </thead>
			  <tbody className="[&>tr]:border-t">
				<tr>
				  <td className="p-3 font-medium">Imagem</td>
				  {selecionados.map((p, i) => (
					<td key={i} className="p-3 text-center">
					  <Link
                  href={p._linkAfilio}
                  className="text-emerald-600 underline text-sm block mt-1"
                  target="_blank"
                >
                  <Image
						src={p._imagem}
						alt={p._titulo}
						width={400}
				        height={400}
						className="w-24 h-24 mx-auto object-contain"
						blurDataURL={p._imagem}
						placeholder="blur"
					  />
                </Link>
					  
					</td>
				  ))}
				</tr>
				<tr>
				  <td className="p-3 font-medium">Nome</td>
				  {selecionados.map((p, i) => (
					<td key={i} className="p-3">{p._titulo}</td>
				  ))}
				</tr>
				<tr>
				  <td className="p-3 font-medium">Preço</td>
				  {selecionados.map((p, i) => (
					<td key={i} className="p-3">
					 
					   {p._preco ?  'R$ ' +  String(p._preco).replace(/[^\d,.-]/g, '') : ''}
					  
					</td>
				  ))}
				</tr>
				<tr>
				  <td className="p-3 font-medium">Loja</td>
				  {selecionados.map((p, i) => (
					<td key={i} className="p-3 capitalize">{p._marca}</td>
				  ))}
				</tr>
				<tr>
				  <td className="p-3 font-medium">Ver produto</td>
				  {selecionados.map((p, i) => (
					<td key={i} className="p-3">
					  <Link
						href={p._linkAfilio}
						target="_blank"
						className="text-blue-600 underline"
					  >
					  	<p    className=" text-center border-dashed rounded border-2 text-2xl mask-clip-content inline-flex shrink-0 text-red-500 border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 hover:border-emerald-200 hover:text-white"
                 > {(p._origem =='cupom' || p._origem =='promo')?p._cupom:'Ir para loja'}</p>
						
					  </Link>
					</td>
				  ))}
				</tr>
				<tr>
				  <td className="p-3 font-medium">Remover</td>
				  {selecionados.map((p, i) => (
					<td key={i} className="p-3 text-center">
					  <button
						onClick={() => toggleSelecionado(p)}
						className="text-red-600 underline text-sm"
					  >
						Remover
					  </button>
					</td>
				  ))}
				</tr>
			  </tbody>
			</table>
		  </div>
	 )}

	  

      {/* Resultados da busca */}
      {loading && <p>🔄 Buscando produtos...</p>}

      {!loading && paginaResultados.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginaResultados.map((p, i) => (
            <div
              key={i}
              onClick={() => toggleSelecionado(p)}
              className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer hover:bg-emerald-100 transition shadow"
            >
              <img src={p._imagem} alt={p._titulo} className="w-full h-48 object-contain mb-2" />
              <p className="font-bold text-lg">{p._titulo}</p>
              <p className="text-sm text-gray-500">{p._marca.toUpperCase()}</p>
              <p className="text-sm">
			
			   {p._preco ?  'R$ ' +  String(p._preco).replace(/[^\d,.-]/g, '') : ''}
			  
			  </p>
              <Link
                href={p._linkAfilio || p._linkLocal || '#'}
                onClick={(e) => e.stopPropagation()}
                className="text-blue-600 underline text-sm mt-2 inline-block"
                target="_blank"
              >  	<p    className=" self-auto  text-center border-dashed rounded border-2 text-2xl mask-clip-content inline-flex shrink-0 text-red-500 border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 hover:border-emerald-200 hover:text-white"
                 > {(p._origem =='cupom' || p._origem =='promo' || p._origem =='voucher')?p._cupom:'ver produto'}</p>
			  
              </Link>
            </div>
          ))}
        </div>
      )}
	   {/* Navegação da paginação */}

      {resultados.length > itensPorPagina && (
        <div className="flex flex-wrap items-center justify-center mt-6 gap-2">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={paginaAtual === 1}
          >
            ◀ Anterior
          </button>
          {[...Array(Math.ceil(resultados.length / itensPorPagina)).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setPaginaAtual(n + 1)}
              className={`px-3 py-1 rounded ${
                paginaAtual === n + 1 ? 'bg-emerald-500 text-white' : 'bg-gray-100'
              }`}
            >
              {n + 1}
            </button>
          ))}
          <button
            onClick={() => setPaginaAtual((p) => Math.min(p + 1, Math.ceil(resultados.length / itensPorPagina)))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={paginaAtual === Math.ceil(resultados.length / itensPorPagina)}
          >
            Próximo ▶
          </button>
        </div>
      )}

      {!loading && resultados.length === 0 && busca.length >= 3 && (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      )}
    </div>
	</>
  );
}
		
