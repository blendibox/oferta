import Head from 'next/head'

import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Listagem from  '../../../components/listagem.js'
import dado from '../../../data/lomadee-segredo-erotico.json'



export const config = { amp: true };


export const getStaticProps = async () =>{
   return {
    props: {
      dados: dado,
    
    }
   }
}


 function returndado({dados}) {

//console.log(dado);

 var ia = 3;

  return (

   <div>

   { dado.map( (item, i) =>
   

    <div  className="containner" key={ia++} >


     <Listagem key={ia++}
        title={item.title}
        image={item.image}
        link={item.link + item.afilio}
        price={item.price}
        brand="Segredo Erótico"
        offer={item.offer}
        priceGoogle={item.price}
        >
     </Listagem>
 
     </div>


   )}

    

    </div>


   

  )
}

export default returndado
