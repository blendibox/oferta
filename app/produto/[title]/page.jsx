import fs from 'fs';
import path from 'path';
import Produto from '../../../components/produto';
import { notFound } from 'next/navigation';

import slugIndex from '../../../data/slugs/slug-index.json';




// Lê todos os arquivos JSON até encontrar o produto com slug correspondente
async function encontrarProdutoPorSlug(slug) {
//	console.log('slug: ' + slug);
  const filename = slugIndex[slug];
 // console.log('filename: ' + filename);
  if (!filename) return null;
	try {
	  const filepath = path.join(process.cwd(), 'data', filename);
	  const conteudo = fs.readFileSync(filepath, 'utf8');
	  const produtos = JSON.parse(conteudo);

	  return produtos.find(p => p.slug === slug) || null;
	  
   } catch (err) {
    console.error(`Erro ao buscar slug ${slug} no arquivo ${filename}:`, err);
    return null;
  }
  

}

// Para gerar páginas estáticas no build
export async function generateStaticParams() {
	
  if (process.env.BUILD_TARGET !== 'produto') {
    return [{ title: '__dummy__' }]; // ⚠️ slug fake para evitar erro no build
  } 	  
	
	  const lote = process.env.LOTE || '1'; // ex: LOTE=1
	  const slugPath = path.join(process.cwd(), `data/slugs/slugs_${lote}.json`);

	  if (!fs.existsSync(slugPath)) {
		console.warn(`❌ Lote ${lote} não encontrado.`);
		return [];
	  }

	  const data = fs.readFileSync(slugPath, 'utf-8');
	  const slugs = JSON.parse(data);
	  return slugs.map(({ slug }) => ({ title: slug }));
  
}


// ✅ Esta função gera o <title> e <meta description>
export async function generateMetadata({ params }) {
  const produto = await encontrarProdutoPorSlug(params.title);

  if (!produto) return {};

  return {
    title: produto.title,
    description: `Compre ${produto.title} com ótimo preço na Blendibox!`,
    alternates: {
      canonical: `https://comprar.blendibox.com.br/produto/${produto.slug}`,
    },
    openGraph: {
      title: produto.title,
      description: `Oferta exclusiva de ${produto.title}. Confira na Blendibox.`,
      images: [produto.image],
    }
  };
}



// Rota dinâmica
export default async function Page({ params }) {
  const slug = params.title;
  
  //console.log('slug: ' + slug)
  
  const produto = await encontrarProdutoPorSlug(String(slug));
//console.log(produto);
  if (!produto) return notFound();

  return (
    <main>
      <Produto
        title={produto.title}
        image={produto.image}
        link={produto.link}
        price={produto.price}
        imageWidth={300}
        imageHeight={450}
        offer={produto.offer}
        resultado_ia={produto.resultado_ia}
        priceGoogle={produto.priceGoogle}
      />
    </main>
  );
}