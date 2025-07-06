import React from 'react';
import Head from 'next/head'
import Image from 'next/image';
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

		  <div className={styles.title}><Link href={link}>
			{storeName} - {category}
			</Link>
		  </div>

         <div className={styles.title}>
		  <h1 ><Link href={link}>{title} *</Link></h1>
		  <br/>
		  <div className={styles.cupom}>
		   <h2 className={styles.cupomUrl}>
		   <div className={styles.cupomLink}>
                    <Link href={link} className={styles.button}><b>{code}</b></Link>
					</div>
             </h2>
           </div>
		  <br />
		  
		  </div>

     
      <small>Categoria: {category}</small>
      <br />
      <br />

      <Link className={styles.button} href={link}>
        Ir para o site {storeName}
         </Link>

      <br />
	
      <br /> 

      <small className={styles.small}>
        * Este cupom de desconto é válido no site{' '}
        <a href={link}>{storeName}</a> até  <b>{vigency}</b> ou enquanto
        durarem os estoques, podendo ser invalidado antes do prazo.
      </small>
	  
	  
	   <div className={styles.AlignCenter}>
		 <div   aria-label="Data da publicação" >					  
			<Link href='https://www.blendibox.com.br' className={styles.AlignCenter}>
					     © 2025, Blendibox - Todos os direitos reservados.
			</Link>
			
		 </div>
		 </div>

      <hr />
	  </main>
    </>
  );
}
