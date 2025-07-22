import fs from 'fs';
import path from 'path';
import Cupom from '../../../components/cupom';
import { notFound } from 'next/navigation';
import { lerProdutoPorSlug } from '../../../lib/awin';



export async function generateStaticParams() {
	

   if (process.env.BUILD_TARGET !== 'promo') {
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





// ✅ Esta função gera o <title> e <meta description>
export async function generateMetadata({ params }) {
	
	
  const { slug } = params;
  const lote = process.env.LOTE || null;
  const produto = await lerProdutoPorSlug(slug, 'PROMO', lote);
 
 

  if (!produto) return {};

  return {
    title: `${produto.offerdescription} ${produto.advertisername} `,
    description: `CUPOM ${produto.offerdescription} EXCLUSIVO PARA VOCÊ no site ${produto.advertisername}! Uma cortesia Blendibox!`,
    alternates: {
      canonical: `https://comprar.blendibox.com.br/produto/${produto.slug}`,
    },
    openGraph: {
      title: produto.offerdescription,
      description: `Aproveite este Cupom ${produto.offerdescription}. Disponível na ${produto.advertisername}.`,
      images: [produto.image],
    }
  };
}





export default async function Page({ params }) {
	
  const { slug } = params;
  const lote = process.env.LOTE || null;
  const produto = await lerProdutoPorSlug(slug,'PROMO',lote);


  if (!produto) return notFound();



  return (
	<main>
	  <Cupom
		vigency={produto.offerenddate || 'Indefinido'}
		id={produto.advertiserid || ''}
		code={produto.couponcode || ''}
		storeName={produto.advertisername || ''}
		category={
		  // Garante que category seja string
		  Array.isArray(produto.categories?.category)
			? produto.categories.category[0]?._ || 'Geral'
			: (produto.categories?.category?._ || produto.categories?.category || 'Geral')
		}
		title={produto.offerdescription || ''}
		image="/images/cupons/cupom_black.png"
		link={produto.clickurl || '#'}
		pixel={produto.impressionpixel || '#'}
		price={produto.offerdescription || 0}
		offer={produto.code || ''}
	  />
	</main>
  );
}