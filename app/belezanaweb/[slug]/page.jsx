import fs from 'fs';
import path from 'path';
import { lerProdutosJSON } from '../../../lib/awin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProdutoAwin from '../../../components/produtoAwin';

export async function generateStaticParams() {
	

  if (process.env.BUILD_TARGET !== 'belezanaweb') {
    return [{ slug: '__dummy__' }]; // ⚠️ slug fake para evitar erro no build
  }
    
  const nomeArquivo = process.env.SLUGS_FILE;

  const indexPath = path.join(process.cwd(), 'data', 'slugs-lotes', nomeArquivo);
  const slugsProduto = [];
  
  const linhas = fs.readFileSync(indexPath, 'utf8').split('\n');
  const slugs = [];

  for (const linha of linhas) {
    if (!linha.trim()) continue; // Ignora linhas vazias
    try {
		
      const obj = JSON.parse(linha);
      if (obj.slug) {
        slugs.push({ slug: obj.slug });
      }
    } catch (e) {
      console.warn(`❌ Erro ao parsear linha: ${linha}`);
    }
  }

  return slugs;
}

export async function generateMetadata({ params }) {
  const produtos = await lerProdutosJSON('BELEZANAWEB');
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
  const produtos = await lerProdutosJSON('BELEZANAWEB');
  const produto = produtos.find(p =>
    p['slug'] === params.slug
  );

  if (!produto) return notFound();

  return (
    <ProdutoAwin
		produto= {produto}
		mybrand='BELEZA NA WEB'
	  >
	  </ProdutoAwin>
  );
}
