import React from 'react'
import Head from 'next/head'
import Image from  './FallbackImage'
import Link from 'next/link'
import Video from './video'
import styles from './Produto.module.css'
import VideoBubble from './VideoBubble'

import SchemaProduto from './SchemaProduto';

export default function Produto(props) {
  const {
    title,
    image,
    link,
    video,
    priceGoogle,
    price,
    offer,
	slug,
    descr,
	resultado_ia,
    imageWidth = 300,
    imageHeight = 450,
  } = props;
  

  

    return (
    <> 
		<head>
		  <SchemaProduto
		   title= {title}
		   image= {image}
		   link = {`https://comprar.blendibox.com.br/produto/${slug}?nike`}
		   brand={'oferta'}
		   priceGoogle= {price}   
		   />
		</head>
	  <main id="content" role="main" className={styles.AlignCenter}>
	  <VideoBubble title="Nome do Produto | 3em1_puffer" />		
      <div className="p-8 max-w-3xl mx-auto  ">
      <h1 className="text-3xl font-bold mb-4">Onde Comprar {title}?</h1>
	   <div className="m-2  items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
		  <Link
			href={link}
			className="inline-block mt-4  px-4 py-2 rounded"
			title={title}
		  >     

		 <Image

			src={image}
			alt={title}
			width={406}
			height={406}
			className="rounded object-cover w-full h-full"
		  />

	     </Link>
		 <h2> Este produto você encontra 
		  <Link
			href={link}
			className="inline-block mt-4  px-4 py-2 rounded underline decoration-emerald-500"
			title={title}
		  >
		 <b>nesta Loja</b>

          </Link>		 
		  </h2>
		 
      <p className="mt-4 text-lg"></p>
	  
	  <Link
			href={link}
			className="inline-block mt-4  px-4 py-2 rounded"
			title={title}
		  >     
		 <Image
			src={image}
			alt={title}
			width={250}
			height={250}
			className="rounded "
		  />
	     </Link>
      <p className="mt-2 text-green-700 font-bold">Preço: {price}*</p>
      <Link
        href={link}
        className="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded text-xl"
      >
        Ver Produto na Loja 
      </Link>
	 
	  <hr className=" mt-12 "/>
	  <p>* Valor na data de publicação - 21/07/2025</p>
	  </div>
    </div>
         
        </main>
	  	  
      </>
    );
  }
