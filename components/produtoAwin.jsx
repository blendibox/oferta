import Image from  './FallbackImage'
import Link from 'next/link'
import Video from './video'
import styles from './Produto.module.css'
import VideoBubble from './VideoBubble'
import SchemaProduto from './SchemaProduto';

export default function ProdutoAwin(props) {
  const {
    produto,
	mybrand

  } = props;

 // const caminho =  mybrand.toLowerCase().trim();
  const linkUrl = `https://comprar.blendibox.com.br/${mybrand}/${produto['slug']}?${mybrand}`;

    return (
      <>   
      <head>		 
		 <SchemaProduto
		   title={produto['text']['name']}
		   image={produto['uri']['mImage']} 
		   link ={linkUrl}
		   brand={produto['brand'] || mybrand}
		   priceGoogle= {produto['price']['buynow']}
		   />
	 </head>
      <main id="content" role="main" className={styles.AlignCenter}>
		<VideoBubble title="Nome do Produto | 3em1_puffer" />		
      <div className="p-8 max-w-3xl mx-auto  ">
      <h1 className="text-3xl font-bold mb-4">Onde Comprar {produto['text']['name']}?</h1>
	   <div className="m-2  items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
		  <Link
			href={produto['uri']['awTrack']}
			className="inline-block mt-4  px-4 py-2 rounded"
			title={produto['text']['name']}
		  >     

		 <Image
			src={produto['uri']['mImage']}
			alt={produto['text']['name']}
			width={406}
			height={406}
			className="rounded object-cover w-full h-full"
		  />

	     </Link>
		 <h2> Este produto você encontra na Loja
		  <Link
			href={produto['uri']['awTrack']}
			className="inline-block mt-4  px-4 py-2 rounded underline decoration-emerald-500"
			title={produto['brand'] || mybrand}
		  >
		 <b>{produto['brand'] || mybrand}</b>

          </Link>		 
		  </h2>
		 
      <p className="mt-4 text-lg">{ (produto['text']['desc'])?produto['text']['desc'].toString("utf8"):""}</p>
	  
	  <Link
			href={produto['uri']['awTrack']}
			className="inline-block mt-4  px-4 py-2 rounded"
			title={produto['text']['name']}
		  >     
		 <Image
			src={produto['uri']['awImage']}
			alt={produto['text']['name']}
			width={250}
			height={250}
			className="rounded "
		  />
	     </Link>
      <p className="mt-2 text-green-700 font-bold">Preço: {produto['price']['buynow']}*</p>
      <Link
        href={produto['uri']['awTrack']}
        className="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded text-xl"
      >
        Ver Produto na Loja {produto['brand'] || mybrand}
      </Link>
	 
	  <hr className=" mt-12 "/>
	  <p>* Valor na data de publicação - 21/07/2025</p>
	  	 <p> Oferta válida enquanto durarem os estoques</p>
	  </div>
    </div>
         
        </main>
      </>
    );
  }
