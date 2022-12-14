import Head from 'next/head'

import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import make from '../../data/avon-make.json'
import perfume from '../../data/avon-fragrancias.json'
import rosto from '../../data/avon-rosto.json'


export const config = { amp: true };


export const getStaticProps = async () =>{
   return {
    props: {
      rostos: rosto,
    
    }
   }
}


 function Avon({makes}) {

//console.log(make);

 var ia = 3;

  return (

   <div>

   { rosto.map( (item, i) =>
   
 
    <div  className="containner" key={ia++} >
      <Head  key={ia++}>

        <title  key={ia++}>{item.title}</title>


        <meta key={ia++} name="robots" content="follow, index" />
        <meta key={ia++} name="description" content={item.title} />
        <meta key={ia++} property="og:site_name" content={item.title} />
        <meta key={ia++} property="og:description" content={item.title} />
        <meta key={ia++} property="og:title" content={item.title} />
        <meta key={ia++} property="og:image" content={item.image} />
        <meta key={ia++} name="twitter:card" content="summary_large_image" />
        <meta key={ia++} name="twitter:site" content="@blendibox.br" />
        <meta key={ia++} name="twitter:title" content={item.title} />
        <meta key={ia++} name="twitter:description" content={item.title} />
        <meta key={ia++} name="twitter:image" content={item.image} />


      </Head>
   
       <h1  key={ia++}>{item.title}</h1>
       <h2  key={ia++}>{item.brand}</h2>

 {
     item.offer == 'undefined' ? <h3  key={ia++}>Por {item.price}</h3> : item.pice == 'undefined'? <h3  key={ia++}>Por {item.offer}</h3>: <h3  key={ia++}> de <span className="caption"  key={ia++}> {item.offer}</span> por {item.price} </h3>
     

 }
  <p  key={ia++}>
           <a className="button" key={ia++}  href={item.link + item.afilio + '&action=buy'}> Quero Comprar 
            <amp-img  className="search" src="search.png"  placeholder="blur"
            width="25" height="25"></amp-img></a>
      </p>
     
     <a  key={ia++} href={item.link + item.afilio + '&action=image'} > 
      <amp-img className="image"
       alt={item.title}
        width="390"
        height="390"
        placeholder="blur"
        key={ia++}
        src={item.image}
      >    
       
      </amp-img>
      </a>
       <p  key={ia++}>
           <a className="button" key={ia++} href={item.link + item.afilio + '&action=more'} 
        
           >
            Quero saber mais  <amp-img  className="search" src="search.png"  placeholder="blur"
        
            width="25" height="25"></amp-img></a>
      </p>

      <p  key={ia++}>
       <hr/>
      </p>

     </div>


   )}

   <hr/>
          <amp-addthis width="320" height="92" data-pub-id="ra-6352ef93c394f488" data-widget-id="9mgw" data-widget-type="inline"></amp-addthis>
           <a className="brand" href={ process.env.URLBASE } >Blendibox</a>

    </div>


   

  )
}

export default Avon
