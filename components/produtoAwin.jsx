import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
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

    return (
      <>   
         
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
			src={produto['uri']['awImage']}
			alt={produto['text']['name']}
			width={600}
			height={600}
			className="rounded "
		  />
	     </Link>
		 <h2> Este produto você encontra na Loja
		  <Link
			href={produto['uri']['awTrack']}
			className="inline-block mt-4  px-4 py-2 rounded underline decoration-emerald-500"
			title={produto['brand'] || "MIZUNO"}
		  >
		 <b>{produto['brand'] || "MIZUNO"}</b>

          </Link>		 
		  </h2>
		 
      <p className="mt-4 text-lg">{produto['text']['desc']}</p>
	  
	  <Link
			href={produto['uri']['awTrack']}
			className="inline-block mt-4  px-4 py-2 rounded"
			title={produto['text']['name']}
		  >     
		 <Image
			src={produto['uri']['awImage']}
			alt={produto['text']['name']}
			width={300}
			height={300}
			className="rounded "
		  />
	     </Link>
      <p className="mt-2 text-green-700 font-bold">Preço: {produto['price']['buynow']}*</p>
      <Link
        href={produto['uri']['awTrack']}
        className="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded text-xl"
      >
        Ver produto na loja {produto['brand'] || mybrand}
      </Link>
	 
	  <hr className=" mt-12 "/>
	  <p>* Valor na data de publicação - 09/07/2025</p>
	  </div>
    </div>
         
        </main>
      </>
    );
  }
