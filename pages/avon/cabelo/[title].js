import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import cabelo from '../../../data/avon_cabelos_.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const cabelos = cabelo.filter(p =>p.title.toString() == title)
     const price = cabelos[0].offer == ''? cabelos[0].price.replace('R','').replace('$','').replace(',','.'): cabelos[0].offer.replace('R','').replace('$','').replace(',','.') ;

   return {
    props: {
      item: cabelos[0],
      price:price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = cabelo.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function cabelo_item({item,price}) {

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


export default cabelo_item