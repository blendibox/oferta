import Head from 'next/head'
import Listagem from  '../../components/listagem.js'
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
      makes :make,
      perfumes:perfume
    
    }
   }
}


 function Avon({makes}) {

//console.log(make);

 var ia = 3;

  return (

   <div>

   { make.map( (item, i) =>
   
 
        <div  className="containner" key={ia++} >

       
         <Listagem key={ia++}
            title={item.title}
            image={item.image}
            link={item.link}
            price={item.price}
            brand="Avon"
            offer={item.offer}
            priceGoogle={item.price}
            >
         </Listagem>

       </div> 

     )
    }


   { perfume.map( (item, i) =>
   
 
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

     )
    }


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

     )
    }


</div>
)

}

export default Avon
