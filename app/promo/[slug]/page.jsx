import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import Cupom from '../../../components/cupom';
import { notFound } from 'next/navigation';

 function gerarSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export async function lerProdutosDoXML() {
  const xmlPath = path.join(process.cwd(), 'data/cupons/RakutenResponse.xml');
  const xmlData = fs.readFileSync(xmlPath, 'utf8');
  const json = await parseStringPromise(xmlData, { explicitArray: false });

  const cupons = json.couponfeed?.link || [];
  return Array.isArray(cupons) ? cupons : [cupons];
}



export async function generateStaticParams() {
  const produtos = await lerProdutosDoXML();
 
  const retorno = produtos.map((p, i) => ({
    slug: gerarSlug(p.advertisername + ' use este cupom ') + '-' + i
  }));
  

  return retorno;
}





// ✅ Esta função gera o <title> e <meta description>
export async function generateMetadata({ params }) {
  const { slug } = params;
  const produtos = await lerProdutosDoXML();
 
  const produto = produtos.find((p, i) =>
    `${ gerarSlug(p.advertisername  +  ' use este cupom ')}-${i}` === slug
  );

  if (!produto) return {};

  return {
    title: `${produto.offerdescription} ${produto.advertisername} `,
    description: `CUPOM ${produto.offerdescription} EXCLUSIVO PARA VOCÊ no site ${produto.advertisername}! Uma cortesia Blendibox!`,
    alternates: {
      canonical: `https://comprar.blendibox.com.br/produto/${gerarSlug(produto.advertisername + ' use este cupom ')}-0}`,
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
  const produtos = await lerProdutosDoXML();

  const produto = produtos.find((p, i) =>
    `${gerarSlug(p.advertisername + ' use este cupom ')}-${i}` === slug
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