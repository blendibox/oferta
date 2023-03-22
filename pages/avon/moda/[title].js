import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import moda from '../../../data/avon-moda.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const modas = moda.filter(p =>p.title.toString() == title)

   const price = modas[0].offer == ''? modas[0].price.replace('R','').replace('$','').replace(',','.'): modas[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: modas[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = moda.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function moda_item({item,price}) {

  return(

  <div  className="containner"  >
    <Produto 
        title={item.title}
        image={item.image}
        link={item.link}
        price={item.price}
        brand="Avon"
        offer={item.offer}
        priceGoogle={price}

    />
    
  </div>
)   

  
}


export default moda_item