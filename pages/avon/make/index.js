import Head from 'next/head'

import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Listagem from  '../../../components/listagem.js'
import make from '../../../data/avon_make_.json'



export const config = { amp: true };


export const getStaticProps = async () =>{
   return {
    props: {
      makes: make,
    
    }
   }
}


 function returnmake({makes}) {

//console.log(make);

 var ia = 3;

  return (

   <div>

   { make.map( (item, i) =>
   

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

export default returnmake
