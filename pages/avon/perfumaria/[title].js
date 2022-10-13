import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import perfume from '../../../data/avon-fragrancias.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const perfumes = perfume.filter(p =>p.title.toString() == title)
    const price = perfumes[0].offer == ''? perfumes[0].price.replace('R','').replace('$','').replace(',','.'): perfumes[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: perfumes[0],
      price:price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = perfume.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function perfume_item({item,price}) {

  return(



  <div  className="containner"  >
    <Produto 
        title={item.title}
        image={item.image}
        link={item.link + item.afilio}
        price={item.price}
        brand={item.brand}
        offer={item.offer}
        priceGoogle={price}

    />
    
  </div>
)   

  
}


export default perfume_item