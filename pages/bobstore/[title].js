import  Produto  from '../../components/produto'
import bobstore from '../../data/rakuten-bobstore.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const bobstores = bobstore.filter(p =>p.title.toString() == title)

   const price = bobstores[0].offer == ''? bobstores[0].price.replace('R','').replace('$','').replace(',','.'): bobstores[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: bobstores[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = bobstore.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function bobstore_item({item,price}) {

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


export default bobstore_item