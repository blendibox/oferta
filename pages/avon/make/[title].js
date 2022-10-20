import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import make from '../../../data/avon-make.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const makes = make.filter(p =>p.title.toString() == title)

   const price = makes[0].offer == ''? makes[0].price.replace('R','').replace('$','').replace(',','.'): makes[0].offer.replace('R','').replace('$','').replace(',','.') ;

   return {
    props: {
      item: makes[0],
      price: price,
    }
   }
}


export const getStaticPaths = async()=>{
	const paths = make.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}







 function make_item({item,price}) {

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


export default make_item