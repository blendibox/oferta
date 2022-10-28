import  Produto  from '../../components/produto'
import richards from '../../data/rakuten-richards.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const richardss = richards.filter(p =>p.title.toString() == title)

   const price = richardss[0].offer == ''? richardss[0].price.replace('R','').replace('$','').replace(',','.'): richardss[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: richardss[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = richards.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function richards_item({item,price}) {

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


export default richards_item