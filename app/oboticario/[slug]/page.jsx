import { lerProdutosJSON } from '../../../lib/awin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProdutoAwin from '../../../components/produtoAwin';

export async function generateStaticParams() {
	
	
   if (process.env.BUILD_TARGET !== 'OBOTICARIO') {
    return [{ slug: '__dummy__' }]; // ⚠️ slug fake para evitar erro no build
  } 
	
  const produtos = await lerProdutosJSON('OBOTICARIO');
  
  const loteAtual = parseInt(process.env.LOTE || '1');
  const tamanhoLote = 1000; // ou o valor desejado
  const inicio = (loteAtual - 1) * tamanhoLote;
  const fim = inicio + tamanhoLote;

  const produtosDoLote = produtos.slice(inicio, fim);

  return produtosDoLote.map((produto) => ({
    slug: produto['slug'],
  }));

 /* return produtos.map((produto) => ({
    slug: gerarSlug(produto['text']['name'], produto['pId']),
  }));*/
}

export async function generateMetadata({ params }) {
  const produtos = await lerProdutosJSON('OBOTICARIO');
  const produto = produtos.find(p =>
    p['slug'] === params.slug
  );

  if (!produto) return {};

  return {
    title: produto['text']['name'],
    description: produto['text']['desc'],
  };
}



export default async function ProdutoPage({ params }) {
  const produtos = await lerProdutosJSON('OBOTICARIO');
  const produto = produtos.find(p =>
    p['slug'] === params.slug
  );

  if (!produto) return notFound();

  return (
	  <ProdutoAwin
		produto= {produto}
		mybrand='O BOTICÁRIO'
	  >
	  </ProdutoAwin>
	  
  );
}
