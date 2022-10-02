import Head from 'next/head'

import Image from 'next/image'
import styles from '../../../styles/Home.module.css'

import corporal from '../../../data/avon-corporal.json'



export const config = { amp: true };


export const getStaticProps = async () =>{
   return {
    props: {
      corporals: corporal,
    
    }
   }
}


 function Corporal({corporals}) {

//console.log(corporal);

 var ia = 3;

  return (

   <div>

   { corporal.map( (item, i) =>
   
 
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
      <h2  key={ia++}>{item.brand}</h2>
       <h1  key={ia++}>{item.title}</h1>

 {
     item.offer == 'undefined' ? <h3  key={ia++}>Por {item.price}</h3> : item.pice == 'undefined'? <h3  key={ia++}>Por {item.offer}</h3>: <h3  key={ia++}> de <span className="caption"  key={ia++}> {item.offer}</span> por {item.price} </h3>
     

 }
  <p  key={ia++}>
           <a className="button" key={ia++}  href={item.link + item.afilio + '&action=buy'}> Quero Comprar 
            <amp-img  className="search" src="../search.png"  placeholder="blur"
            width="25" height="25"></amp-img></a>
      </p>
     
     <a  key={ia++} href={item.link + item.afilio + '&action=image'} > 
      <amp-img className="image"
        alt="Mountains"
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
            Quero saber mais  <amp-img  className="search" src="../search.png"  placeholder="blur"
        
            width="25" height="25"></amp-img></a>
      </p>

      <p  key={ia++}>
       <hr/>
      </p>

     </div>


   )}

    

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

export default Corporal
