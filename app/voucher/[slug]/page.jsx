import fs from 'fs';
import path from 'path';
import Cupom from '../../../components/cupom';
import { notFound } from 'next/navigation';
import { lerProdutoPorSlug } from '../../../lib/awin';


export async function generateStaticParams() {

   if (process.env.BUILD_TARGET !== 'voucher') {
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
   
  const lote = process.env.LOTE || null;
  const produto = await lerProdutoPorSlug(params.slug,'VOUCHER',lote);

  if (!produto) return {};

  return {
    title: produto.title,
    description: produto.description,
  };
}





export default async function Page({ params }) {
	
  const { slug } = params;
  const lote =  null;
  const produto = await lerProdutoPorSlug(slug, 'VOUCHER',lote);


  if (!produto) return notFound();

  return (
    <main>
      <Cupom
		vigency={produto.ends|| 'Indefinido'}
		id={produto.promotion_id|| ''}
		code={produto.code || ''}
		storeName={produto.advertiser|| ''}
		category={produto.categories|| 'Geral'}
        title={produto.title|| ''}
        image="/images/cupons/cupom.png"
        link={produto.deeplink_tracking || '#'}
        price={produto.description || 0}
        offer={produto.code|| ''}
      />
    </main>
  );
}