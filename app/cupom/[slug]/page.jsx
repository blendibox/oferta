import fs from 'fs';
import path from 'path';
import Cupom from '../../../components/cupom';
import { notFound } from 'next/navigation';
import { lerProdutosJSON } from '../../../lib/awin';


export async function generateStaticParams() {

   if (process.env.BUILD_TARGET !== 'cupom') {
    return [{ slug: '__dummy__' }]; // ⚠️ slug fake para evitar erro no build
  }

  const indexPath = path.join(process.cwd(), 'public', 'slug-index.json');
  const slugIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  const slugsProduto = Object.entries(slugIndex)
    .filter(([_, arquivo]) =>  /^cupom\.json$/i.test(arquivo))
    .map(([slug]) => slug);
  
    
  const loteAtual = parseInt(process.env.LOTE || '1');
  const tamanhoLote = 10000; // ou o valor desejado
  const inicio = (loteAtual - 1) * tamanhoLote;
  const fim = inicio + tamanhoLote;

  const slugsDoLote  = slugsProduto.slice(inicio, fim);

  return slugsDoLote.map((slug) => ({
    slug
  }));
  
  /*
  return produtos.map((p, i) => ({
    slug: gerarSlug(p.title) + '-' + i
  }));*/
}





// ✅ Esta função gera o <title> e <meta description>
export async function generateMetadata({ params }) {
    const { slug } = params;
  const produtos = await lerProdutosJSON('CUPOM');
  

  const produto = produtos.find((p, i) =>
   p.slug === slug
  );
  console.log(produto);

  if (!produto) return {};

  return {
    title: `${produto.title} ${produto.store.name} `,
    description: `CUPOM ${produto.title} EXCLUSIVO PARA VOCÊ no site ${produto.store.name}! Uma cortesia Blendibox!`,
    alternates: {
      canonical: `https://comprar.blendibox.com.br/produto/${produto.slug}`,
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
  const produtos = await lerProdutosJSON('CUPOM');

  const produto = produtos.find((p, i) =>
    p.slug === slug
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