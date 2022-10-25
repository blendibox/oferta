import Head from 'next/head'

import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Listagem from  '../../../components/listagem.js'
import unha from '../../../data/avon-unha.json'



export const config = { amp: true };


export const getStaticProps = async () =>{
   return {
    props: {
      unhas: unha,
    
    }
   }
}


 function returnunha({unhas}) {

//console.log(unha);

 var ia = 3;

  return (

   <div>

   { unha.map( (item, i) =>
   

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

export default returnunha
