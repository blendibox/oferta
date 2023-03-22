import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import objeto from '../../../data/lomadee-segredo-erotico.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const objetos = objeto.filter(p =>p.url.toString() == title)

   const price = objetos[0].offer == ''? objetos[0].price.replace('R','').replace('$','').replace(',','.'): objetos[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: objetos[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = objeto.map(item =>({
		params: {title: item.url.toString()},
	}))
	return {paths,fallback: false}
}

 function objeto_item({item,price}) {

  return(


   <div  className="containner"  >
    <Produto 
        title={item.title}
        image={item.image}
        link={item.link + item.afilio}
        price={item.price}
        brand={item.brand}
        offer={item.offer}
        descr={item.descr.split('Como comprar')}
        priceGoogle={price}

    />
    
  </div>

)   

  
}


export default objeto_item