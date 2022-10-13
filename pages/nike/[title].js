import  Produto  from '../../components/produto'
import nike from '../../data/lomadee-nike.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const nikes = nike.filter(p =>p.title.toString() == title)

   const price = nikes[0].offer == ''? nikes[0].price.replace('R','').replace('$','').replace(',','.'): nikes[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: nikes[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = nike.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function nike_item({item,price}) {

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


export default nike_item