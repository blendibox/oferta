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

async function lerProdutosDoXML() {
  const xmlPath = path.join(process.cwd(), 'data/cupons/LomadeeDownload.xml');
  const xmlData = fs.readFileSync(xmlPath, 'utf8');
  const json = await parseStringPromise(xmlData, { explicitArray: false });

  const cupons = json.coupons?.coupon || [];
  return Array.isArray(cupons) ? cupons : [cupons];
}

export async function generateStaticParams() {
  const produtos = await lerProdutosDoXML();
  return produtos.map((p, i) => ({
    slug: gerarSlug(p.title) + '-' + i
  }));
}





// ✅ Esta função gera o <title> e <meta description>
export async function generateMetadata({ params }) {
    const { slug } = params;
  const produtos = await lerProdutosDoXML();

  const produto = produtos.find((p, i) =>
    `${gerarSlug(p.title)}-${i}` === slug
  );

  if (!produto) return {};

  return {
    title: `${produto.title} ${produto.store.name} `,
    description: `CUPOM ${produto.title} EXCLUSIVO PARA VOCÊ no site ${produto.store.name}! Uma cortesia Blendibox!`,
    alternates: {
      canonical: `https://comprar.blendibox.com.br/produto/${gerarSlug(produto.title)}-0}`,
    },
    openGraph: {
      title: produto.title,
      description: `Aproveite este Cupom ${produto.title}. Disponível na ${produto.store.name}.`,
      images: [produto.image],
    }
  };
}





export default async function Page({ params }) {
  const { slug } = params;
  const produtos = await lerProdutosDoXML();

  const produto = produtos.find((p, i) =>
    `${gerarSlug(p.title)}-${i}` === slug
  );

  if (!produto) return notFound();



  return (
    <main>
      <Cupom
		vigency={produto.vigency.endDate|| 'Indefinido'}
		id={produto.store.id|| ''}
		code={produto.code || ''}
		storeName={produto.store.name|| ''}
		category={produto.category.name|| 'Geral'}
        title={produto.title|| ''}
        image="/images/cupons/cupom.png"
        link={produto.link || '#'}
        price={`Desconto de ${produto.discount || 0}%`}
        offer={produto.code|| ''}
      />
    </main>
  );
}