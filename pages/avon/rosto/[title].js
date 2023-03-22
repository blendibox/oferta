import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import rosto from '../../../data/avon_rosto_.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const rostos = rosto.filter(p =>p.url.toString() == title)
      const price = rostos[0].offer == ''? rostos[0].price.replace('R','').replace('$','').replace(',','.'): rostos[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: rostos[0],
      price:price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = rosto.map(item =>({
		params: {title: item.url.toString()},
	}))
	return {paths,fallback: false}
}

 function rosto_item({item,price}) {

  return(



  <div  className="containner"  >
    <Produto 
        title={item.title}
        image={item.image}
        link={item.link + item.afilio}
        price={item.price}
        brand="Avon"
        offer={item.offer}
        priceGoogle={price}

    />
    
  </div>
)   

  
}


export default rosto_item