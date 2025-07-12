import fs from 'fs';
import path from 'path';
import Cupom from '../../../components/cupom';
import { notFound } from 'next/navigation';
import { lerProdutosJSON } from '../../../lib/awin';




export async function generateStaticParams() {
	

   if (process.env.BUILD_TARGET !== 'promo') {
    return [{ slug: '__dummy__' }]; // ⚠️ slug fake para evitar erro no build
  }   
  
    
  const indexPath = path.join(process.cwd(), 'public', 'slug-index.json');
  const slugIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  const slugsProduto = Object.entries(slugIndex)
    .filter(([_, arquivo]) =>  /^promo\.json$/i.test(arquivo))
    .map(([slug]) => slug);
  
    
  const loteAtual = parseInt(process.env.LOTE || '1');
  const tamanhoLote = 10000; // ou o valor desejado
  const inicio = (loteAtual - 1) * tamanhoLote;
  const fim = inicio + tamanhoLote;

  const slugsDoLote  = slugsProduto.slice(inicio, fim);

  return slugsDoLote.map((slug) => ({
    slug
  }));
 
  /*const retorno = produtos.map((p, i) => ({
    slug: gerarSlug(p.advertisername + ' use este cupom ') + '-' + i
  }));*/
  

  return retorno;
}





// ✅ Esta função gera o <title> e <meta description>
export async function generateMetadata({ params }) {
  const { slug } = params;
  const produtos = await lerProdutosJSON('PROMO');
 
  const produto = produtos.find((p, i) =>
    p.slug === slug
  );

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
  const produtos = await lerProdutosJSON('PROMO')

  const produto = produtos.find((p, i) =>
    p.slug  === slug
  );

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