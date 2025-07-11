import { lerProdutosXML, gerarSlug } from '../../../lib/awin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProdutoAwin from '../../../components/produtoAwin';

export async function generateStaticParams() {

    if (process.env.BUILD_TARGET !== 'kippling') {
    return [{ slug: '__dummy__' }]; // ⚠️ slug fake para evitar erro no build
  }   
	
	  
  const produtos = await lerProdutosXML('KIPPLING');
  
    
  const loteAtual = parseInt(process.env.LOTE || '1');
  const tamanhoLote = 10000; // ou o valor desejado
  const inicio = (loteAtual - 1) * tamanhoLote;
  const fim = inicio + tamanhoLote;

  const produtosDoLote = produtos.slice(inicio, fim);

  return produtosDoLote.map((produto) => ({
    slug: gerarSlug(produto['text']['name'], produto['pId']),
  }));

  /*return produtos.map((produto) => ({
    slug: gerarSlug(produto['text']['name'], produto['pId']),
  }));*/
}

export async function generateMetadata({ params }) {
  const produtos = await lerProdutosXML('KIPPLING');
  const produto = produtos.find(p =>
    gerarSlug(p['text']['name'], p['pId']) === params.slug
  );

  if (!produto) return {};

  return {
    title: produto['text']['name'],
    description: produto['text']['desc'],
  };
}


export default async function ProdutoPage({ params }) {
  const produtos = await lerProdutosXML('KIPPLING');
  const produto = produtos.find(p =>
    gerarSlug(p['text']['name'], p['pId']) === params.slug
  );

  if (!produto) return notFound();

  return (
    <ProdutoAwin
		produto= {produto}
		mybrand='KIPLING'
	  >
	  </ProdutoAwin>
  );
}
