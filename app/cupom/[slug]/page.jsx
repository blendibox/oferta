import fs from 'fs';
import path from 'path';
import Cupom from '../../../components/cupom';
import { notFound } from 'next/navigation';
import { lerProdutoPorSlug } from '../../../lib/awin';


export async function generateStaticParams() {

   if (process.env.BUILD_TARGET !== 'cupom') {
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
  const produto = await lerProdutoPorSlug(slug,'CUPOM');
  



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
  const produto = await lerProdutoPorSlug(slug, 'CUPOM');


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