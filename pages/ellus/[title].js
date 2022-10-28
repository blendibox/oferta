import  Produto  from '../../components/produto'
import ellus from '../../data/rakuten-ellus.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const elluss = ellus.filter(p =>p.title.toString() == title)

   const price = elluss[0].offer == ''? elluss[0].price.replace('R','').replace('$','').replace(',','.'): elluss[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: elluss[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = ellus.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function ellus_item({item,price}) {

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


export default ellus_item