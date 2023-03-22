import Head from 'next/head'

import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Listagem from  '../../../components/listagem.js'
import cabelo from '../../../data/avon_cabelos_.json'



export const config = { amp: true };


export const getStaticProps = async () =>{
   return {
    props: {
      cabelos: cabelo,
    
    }
   }
}


 function returncabelo({cabelos}) {

//console.log(cabelo);

 var ia = 3;

  return (

   <div>

   { cabelo.map( (item, i) =>
   

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

export default returncabelo
