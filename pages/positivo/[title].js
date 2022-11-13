import  Produto  from '../../components/produto'
import positivo from '../../data/lomadee-positivo.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const positivos = positivo.filter(p =>p.title.toString() == title)

   const price = positivos[0].offer == ''? positivos[0].price.replace('R','').replace('$','').replace(',','.'): positivos[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: positivos[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = positivo.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function positivo_item({item,price}) {

  return(


  <div  className="containner"  >
    <Produto 
        title={item.title}
        image={item.image}
        link={item.link + item.afilio}
        price={item.price}
        imageWidth = {300}
        imageHeight = {450}
        brand={item.brand}
        offer={item.offer}
        priceGoogle={price}

    />
    
  </div>

)   

  
}


export default positivo_item