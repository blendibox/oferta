import Head from 'next/head'

import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Listagem from  '../../../components/listagem.js'
import rosto from '../../../data/avon_rosto_.json'



export const config = { amp: true };


export const getStaticProps = async () =>{
   return {
    props: {
      rostos: rosto,
    
    }
   }
}


 function returnrosto({rostos}) {

//console.log(rosto);

 var ia = 3;

  return (

   <div>

   { rosto.map( (item, i) =>
   

    <div  className="containner" key={ia++} >


     <Listagem key={ia++}
        title={item.title}
        image={item.image}
        link={item.link + item.afilio}
        price={item.price}
        brand="Avon"
        offer={item.offer}
        priceGoogle={item.price}
        >
     </Listagem>
 
     </div>


   )}

    

    </div>


   

  )
}

export default returnrosto
