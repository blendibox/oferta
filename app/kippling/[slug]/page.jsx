import { lerProdutosXML, gerarSlug } from '../../../lib/awin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProdutoAwin from '../../../components/produtoAwin';

export async function generateStaticParams() {
  const produtos = await lerProdutosXML('KIPPLING');

  return produtos.map((produto) => ({
    slug: gerarSlug(produto['text']['name'], produto['pId']),
  }));
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
