
import fs from 'fs';
import path from 'path';

import { lerCategoriasJson } from '../../../lib/lerCategorias';

export async function generateStaticParams() {
  const categoriasPath = path.join(process.cwd(), 'public', 'categorias.json');
  const categoriasJson = JSON.parse(fs.readFileSync(categoriasPath, 'utf-8'));

  const slugs = [];

  function coletar(categorias) {
    for (const [_, dados] of Object.entries(categorias)) {
      if (dados?.slug) {
        slugs.push({ slug: dados.slug.split('/') });
      }
      if (dados.subcategorias) {
        coletar(dados.subcategorias);
      }
    }
  }

  coletar(categoriasJson);

  // Se não for o alvo do build, retorna um slug fake
  if (process.env.BUILD_TARGET !== 'categoria') {
    return [{ slug: ['__dummy__'] }];
  }

  /*const loteAtual = parseInt(process.env.LOTE || '1');
  const tamanhoLote = 300; // Ajuste conforme a complexidade
  const inicio = (loteAtual - 1) * tamanhoLote;
  const fim = inicio + tamanhoLote;

  return slugs.slice(inicio, fim);
  */
  
  return slugs;
}



export async function generateMetadata({ params }) {
  const slugArray = params.slug;

  const categoriasJson = lerCategoriasJson();

  const deslugify = (slug) =>
    slug
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');

  const caminhoNormalizado = slugArray.map(deslugify).join(' > ').toLowerCase();

  const encontrarCategoria = (categorias, caminho = []) => {
    for (const [nome, dados] of Object.entries(categorias)) {
      const slug = dados.slug || [...caminho, nome.toLowerCase()].join('/');
      if (slug === slugArray.join('/')) return dados;
      if (dados.subcategorias) {
        const encontrada = encontrarCategoria(dados.subcategorias, [...caminho, nome.toLowerCase()]);
        if (encontrada) return encontrada;
      }
    }
    return null;
  };

  const categoria = encontrarCategoria(categoriasJson);

  const nomePagina = slugArray.map(deslugify).join(' › ');
  const descricao = categoria?.descricao || `Confira ofertas e produtos na categoria ${nomePagina} com os melhores preços.`;

  return {
    title: nomePagina,
    description: descricao,
	robots: 'index, follow',
  };
}


export default function CategoriaPage() {
  // o layout + ResultadosFiltrados vai cuidar do resto
  return <div id="categoria-page" />;
}
