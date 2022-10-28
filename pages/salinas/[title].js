import  Produto  from '../../components/produto'
import salinas from '../../data/rakuten-salinas.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const salinass = salinas.filter(p =>p.title.toString() == title)

   const price = salinass[0].offer == ''? salinass[0].price.replace('R','').replace('$','').replace(',','.'): salinass[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: salinass[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = salinas.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function salinas_item({item,price}) {

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


export default salinas_item