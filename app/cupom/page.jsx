import CupomCard from '../../components/CupomCard';
import CupomCard2 from '../../components/CupomCard2';
import { lerProdutosJSON } from '../../lib/awin';


// ✅ Esta função gera o <title> e <meta description>
export async function generateMetadata() {

  return {
    title: 'Cupons de Desconto',
    description: `Cupons de Deconto de  diversas lojas, uma cortesia da Blendibox!`,
    alternates: {
      canonical: `https://comprar.blendibox.com.br`,
    },
    openGraph: {
      title: 'Cupons de Desconto',
      description: `Cupons de Deconto de diversas lojas parceiras, uma cortesia da Blendibox!`,
    }
  };
}



export default async function Home() {
  const produtos = await lerProdutosJSON('CUPOM');
  const produtos2 = await lerProdutosJSON('PROMO');

  return (
    <div className="m-6 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="items-center gap-8 rounded-lg bg-white p-6 shadow-md">
        <h1 className="font-sans font-black text-center text-4xl italic text-white rounded-lg bg-emerald-500 bold p-6 m-6">
          Vem que tem <b>CUPOM</b>!*
        </h1>

        {produtos.map((item, i) => (
          <CupomCard key={i} item={item} />
        ))}
		
		
		{produtos2.map((item, i) => (
          <CupomCard2 key={i} item={item} />
        ))}
		
      </div>
    </div>
  );
}
