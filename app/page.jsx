import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

import CupomCard2 from '../components/CupomCard2';

import CompararProdutos    from '../components/CompararProdutos';
import BreadcrumbCategoria from '../components/BreadcrumbCategoria';





export async function lerProdutosDoXML2() {
  const xmlPath = path.join(process.cwd(), 'data/cupons/RakutenResponse.xml');
  const xmlData = fs.readFileSync(xmlPath, 'utf8');
  const json = await parseStringPromise(xmlData, { explicitArray: false });

  const cupons = json.couponfeed?.link || [];
  return Array.isArray(cupons) ? cupons : [cupons];
}



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

  const produtos2 = await lerProdutosDoXML2();

  return (
   <div className="max-w-7xl mx-auto px-4">

    <div className="m-6 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="items-center gap-8 rounded-lg bg-white p-6 shadow-md">
	  
	  <div className="rounded-xl bg-[url(/images/banner.webp)] bg-fixed bg-center md:bg-cover mb-5 drop-shadow-xl ">
		<div className=" p-5 rounded">
			<div className="bg-white/40 backdrop-blur-md p-3 rounded drop-shadow-xl">
			  <h2 className="text-2xl font-bold mb-3 text-center pt-3  text-sky-950 text-shadow-2xs text-shadow-sky-100">

			  Vem que tem <b>CUPOM</b>!<b className="text-pink-400">✱</b>
			</h2>
			</div>
		</div>
	  </div>

		
		{produtos2.map((item, i) => (
          <CupomCard2 key={i} item={item} />
        ))}
		
      </div>
    </div>
	</div>
  );
}
