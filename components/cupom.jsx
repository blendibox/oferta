import React from 'react';
import Head from 'next/head'
import Image from  './FallbackImage';
import Link from 'next/link';
import styles from './Cupom.module.css';

export default function Cupom(props) {
    const {
    vigency,
    id,
    link,
    storeName,
    category,
    title,
    image,
	code,
	price,
    offer
  } = props;
  

  return (
    <>	
	
	    <Head>
          <title>{title}</title>
        </Head>
		 
    <main id="content" role="main" className={styles.container}>
<div className={styles.compraSeguraContainer} >
		  <div className={styles.title}><Link href={link}>
			{storeName} - {category}
			</Link>
		  </div>

         <div className={styles.title}>
		  <h1 className={styles.titleA}><Link href={link}>{title} *</Link></h1>
		    </div>
		  <br/>
		  <div className={styles.cupom_black}>
		      <h2 className={styles.cupomUrl}>
		           <div className={styles.cupomLink}>
                    <Link href={link} className={styles.button}><b>{code || `Ir para ${storeName} `}</b></Link>
					</div>
               </h2>
           </div>
		  <br />
  
      <small>Categoria: {category}</small>
      <br />
      <br />

      <Link className={styles.button} href={link}>
        Ir para o Site da Loja {storeName}
         </Link>

      <br />
	
      <br /> 

      <small className={styles.small}>
        * Esta oferta e válida no site{' '}
        <a href={link}>{storeName}</a> até  <b>{vigency}</b> ou enquanto
        durarem os estoques, podendo ser invalidado antes do prazo.
      </small>
	  
	  
	

      <hr />
	  </div>
	  </main>
    </>
  );
}
