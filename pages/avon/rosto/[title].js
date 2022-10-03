import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import rosto from '../../../data/avon-rosto.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const rostos = rosto.filter(p =>p.title.toString() == title)
      const price = rostos[0].offer == ''? rostos[0].price.replace('R','').replace('$','').replace(',','.'): rostos[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: rostos[0],
      price:price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = rosto.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function rosto_item({item,price}) {

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
                    "priceValidUntil": "2022-11-20",
                    "itemCondition": "https://schema.org/UsedCondition",
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
        alt="Mountains"
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

     



      <style jsx>{`


        .button:hover {
          animation-name: shake;
          animation-duration: 0.82s;

          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0);
          }
          
          20%, 80% {
            transform: translate3d(2px, 0, 0);
          }

          30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
          }

          40%, 60% {
            transform: translate3d(4px, 0, 0);
          }
        }

        .containner{
          text-align:center;
          font-family: Poppins;
        }
        h1, h2 {
          margin: 5px;
           font-family: Poppins;
        }
         h1 {
          font-size: 1.2em;
           font-family: Poppins;
        }
        h2{
          color:#222222;
        }
        a{
          text-decoration:none;
          color:#222222;
        }
        .search{
          top:4px;
        }
        .image{
         
        }
        .button{
          background-color:#f05395;
          color:#ffffff;
          font-size:1.1em;
          border-radius:8px;
          padding: 5px 5px 5px 5px;
          
        }
        p {
          font-size: 18px;
          line-height: 30px;
          margin-top: 30px;
           font-family: Poppins;
        }
        .caption {
          color: #444444;
          margin-top: 0;
          font-size: 14px;
          text-decoration: line-through;
          text-align: center;
        }
      `}</style>

    </div>

)   

  
}


export default rosto_item