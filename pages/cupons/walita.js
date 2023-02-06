import Head from 'next/head'

import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Listagem from  '../../components/listagem.js'
import xml from  "raw-loader!../../data/LomadeeWalita.xml"



export const config = { amp: true };

var parser = require('xml2json-light');


export const getStaticProps = async () =>{


const coupons = await xml;


//console.log(coupons);

const data  = await parser.xml2json(coupons);


   return {
    props: {
      item: data.coupons,
      erro:'Você não possui permissão para divulgar esse anunciante.',

    }
   }

}



var ia = 3;

 function returnCupons( props ) {

  return (

   <div>

 
     { props.item.coupon.map( (item, i) =>
   

    <div  className="containner" key={ia++} >


         <a   href={item.link ==props.erro? item.store.link: item.link } > 
           <amp-img className="image"
            alt={item.store.title}
            width="180"
            height="130"
            placeholder="blur"
            src={item.store.image1}
          >         
          </amp-img>
        </a>
        <br/>
        <small>{item.store.name}  - {item.category.name}</small><br/><br/>

        <h1>{item.title} *</h1><br/>

        <h2 className="cupom">CUPOM: <a   href={item.link ==props.erro? item.store.link: item.link}> <b> {item.code} </b> </a></h2>
        <small>Categoria: {item.category.name}</small>
        <br/><br/>

        <a className="button" href={item.link ==props.erro? item.store.link: item.link}> Ir para o site {item.store.name} <amp-img  className="search" src="../../arrow-right.png"  placeholder="blur"
        
            width="20" height="20"></amp-img>
        </a>
        <br/><br/>
             
        <small>* Este cupom de desconto é válido no site    <a   href={item.link ==props.erro? item.store.link: item.link } >  {item.store.name} </a>, até o dia <b> {item.vigency.endDate.split(' ')[0]} </b> ou enquanto durarem os estoques, podendo ser invalidado antes do prazo.</small>
         

      <hr/>
     </div>


   )}







 


 
    

    </div>


   

  )
}

export default returnCupons
