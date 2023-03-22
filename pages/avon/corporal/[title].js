import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import corporal from '../../../data/avon_corporal_.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const corporals = corporal.filter(p =>p.url.toString() == title)

  const price = corporals[0].offer == ''? corporals[0].price.replace('R','').replace('$','').replace(',','.'): corporals[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: corporals[0],
      price:price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = corporal.map(item =>({
		params: {title: item.url.toString()},
	}))
	return {paths,fallback: false}
}

 function corporal_item({item,price}) {

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


export default corporal_item