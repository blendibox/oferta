import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import casa from '../../../data/avon-casa.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const casas = casa.filter(p =>p.title.toString() == title)

   const price = casas[0].offer == ''? casas[0].price.replace('R','').replace('$','').replace(',','.'): casas[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: casas[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = casa.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function casa_item({item,price}) {

  return(


    <div  className="containner"  >
      <Head  >

        <title  >{item.title}</title>
        <script    type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(

                {
                  "@context": "https://schema.org/", 
                  "@type": "Product", 
                  "name": item.title,
                  "image": item.image,
                  "url": item.link + item.afilio,
                  "description": "Procurando onde comprar " + item.title + ' original? '+process.env.GATILHO_MENTAL + ' Oferta exclusiva ' + item.title,
                  "brand": {
                    "@type": "Brand",
                    "name": item.brand
                  },

                  "offers": {
                    "@type": "Offer",
                    "url": item.link + item.afilio,
                    "priceCurrency": "BRL",
                    "price":  price,
                    "itemCondition": "https://schema.org/NewCondition",
                    "availability": "https://schema.org/InStock"
                  },
              }
            )
             
          }}
        />


        <meta  name="robots" content="follow, index" />
        <meta  name="description" content={item.title} />
        <meta  property="og:site_name" content={item.title} />
        <meta  property="og:description" content={item.title} />
        <meta  property="og:title" content={item.title} />
        <meta  property="og:image" content={item.image} />
        <meta  name="twitter:card" content="summary_large_image" />
        <meta  name="twitter:site" content="@blendibox.br" />
        <meta  name="twitter:title" content={item.title} />
        <meta  name="twitter:description" content={item.title} />
        <meta  name="twitter:image" content={item.image} />


      </Head>
      <h2  >{item.brand}</h2>
       <h1  >{item.title}</h1>

 {
     item.offer == 'undefined' ? <h3  >Por {item.price}</h3> : item.pice == 'undefined'? <h3  >Por {item.offer}</h3>: <h3  > de <span className="caption"  > {item.offer}</span> por {item.price} </h3>
     

 }
  <p  >
           <a className="button"   href={item.link + item.afilio + '&action=buy'}> Quero Comprar 
            <amp-img  className="search" src="../../search.png"  placeholder="blur"
            width="25" height="25"></amp-img></a>
      </p>
     
     <a   href={item.link + item.afilio + '&action=image'} > 
      <amp-img className="image"
        alt={item.title}
        width="350"
        height="350"
        placeholder="blur"
        
        src={item.image}
      >    
       
      </amp-img>
      </a>
       <p  >
           <a className="button"  href={item.link + item.afilio + '&action=more'} 
        
           >
            Quero saber mais  <amp-img  className="search" src="../../search.png"  placeholder="blur"
        
            width="25" height="25"></amp-img></a>
      </p>

      <p  >
            </p>

     


    </div>

)   

  
}


export default casa_item