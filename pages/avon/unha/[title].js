import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import unha from '../../../data/avon_unhas_.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const unhas = unha.filter(p =>p.url.toString() == title)

   const price = unhas[0].offer == ''? unhas[0].price.replace('R','').replace('$','').replace(',','.'): unhas[0].offer.replace('R','').replace('$','').replace(',','.') ;

   return {
    props: {
      item: unhas[0],
      price:price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = unha.map(item =>({
		params: {title: item.url.toString()},
	}))
	return {paths,fallback: false}
}

 function unha_item({item,price}) {

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


export default unha_item