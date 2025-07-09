import { lerProdutosXML, gerarSlug } from '../../../lib/awin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const produtos = await lerProdutosXML();

  return produtos.map((produto) => ({
    slug: gerarSlug(produto['g:title'], produto['g:id']),
  }));
}

export async function generateMetadata({ params }) {
  const produtos = await lerProdutosXML();
  const produto = produtos.find(p =>
    gerarSlug(p['g:title'], p['g:id']) === params.slug
  );

  if (!produto) return {};

  return {
    title: produto['g:title'],
    description: produto['g:description'],
  };
}

export default async function ProdutoPage({ params }) {
  const produtos = await lerProdutosXML();
  const produto = produtos.find(p =>
    gerarSlug(p['g:title'], p['g:id']) === params.slug
  );

  if (!produto) return notFound();

  return (
    <div className="p-8 max-w-3xl mx-auto  ">
      <h1 className="text-3xl font-bold mb-4">Onde Comprar {produto['g:title']}?</h1>
	   <div className="m-2  items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
		  <Link
			href={produto['aw_deep_link']}
			className="inline-block mt-4  px-4 py-2 rounded"
			title={produto['g:advertiser_name']}
		  >     
		 <Image
			src={produto['g:image_link']}
			alt={produto['g:title']}
			width={600}
			height={600}
			className="rounded "
		  />
	     </Link>
		 <h2> Este produto você encontra na
		  <Link
			href={produto['aw_deep_link']}
			className="inline-block mt-4  px-4 py-2 rounded underline decoration-emerald-500"
			title={produto['g:advertiser_name']}
		  >
		 <b>{produto['g:meta']['g:advertiser_name'] || ""}</b>

          </Link>		 
		  </h2>
		 
      <p className="mt-4 text-lg">{produto['g:description']}</p>
      <p className="mt-2 text-green-700 font-bold">Preço: {produto['g:price']}*</p>
      <Link
        href={produto['aw_deep_link']}
        className="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded text-xl"
      >
        Ver produto na loja {produto['g:meta']['g:advertiser_name'] || ""}
      </Link>
	 
	  <hr className=" mt-12 "/>
	  <p>* Valor na data de publicação - 09/07/2025</p>
	  </div>
    </div>
  );
}
