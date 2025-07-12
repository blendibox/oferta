import fs from 'fs';
import path from 'path';
import { lerProdutosJSON, gerarSlug } from '../../../lib/awin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProdutoAwin from '../../../components/produtoAwin';

export async function generateStaticParams() {

    if (process.env.BUILD_TARGET !== 'kippling') {
    return [{ slug: '__dummy__' }]; // ⚠️ slug fake para evitar erro no build
  }   
	
	  
    
  const indexPath = path.join(process.cwd(), 'public', 'slug-index.json');
  const slugIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  const slugsProduto = Object.entries(slugIndex)
    .filter(([_, arquivo]) =>  /^kippling\.json$/i.test(arquivo))
    .map(([slug]) => slug);
  
    
  const loteAtual = parseInt(process.env.LOTE || '1');
  const tamanhoLote = 10000; // ou o valor desejado
  const inicio = (loteAtual - 1) * tamanhoLote;
  const fim = inicio + tamanhoLote;

  const slugsDoLote  = slugsProduto.slice(inicio, fim);

  return slugsDoLote.map((slug) => ({
    slug
  }));
 
}

export async function generateMetadata({ params }) {
  const produtos = await lerProdutosJSON('KIPPLING');
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
  const produtos = await lerProdutosJSON('KIPPLING');
  const produto = produtos.find(p =>
    p['slug'] === params.slug
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
