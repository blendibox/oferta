import Head from 'next/head'
import Image from 'next/image'

import casa from '../../data/lomadee-nike.json'
import NextLink from 'next/link'


export const config = { amp: true };

export const getStaticProps = async ({params: {title} }) =>{

	const casas = casa.filter(p =>p.title.toString() == title)

   const price = casas[0].offer == ''? casas[0].price.replace('R','').replace('$','').replace(',','.'): casas[0].offer.replace('R','').replace('$','').replace(',','.') ;


   return {
    props: {
      item: casas[0],
      price: price,

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = casa.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function casa_item({item,price}) {

  return(


    <div  className="containner"  >
      <Head  >

        <title  >{item.title}</title>
        <script    type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(

                {
                  "@context": "https://schema.org/", 
                  "@type": "Product", 
                  "name": item.title,
                  "image": item.image,
                  "url": item.link + item.afilio,
                  "description": "Procurando onde comprar " + item.title + ' original? '+process.env.GATILHO_MENTAL + ' Oferta exclusiva ' + item.title,
                  "brand": {
                    "@type": "Brand",
                    "name": item.brand
                  },

                  "offers": {
                    "@type": "Offer",
                    "url": item.link + item.afilio,
                    "priceCurrency": "BRL",
                    "price":  price,
                    "itemCondition": "https://schema.org/NewCondition",
                    "availability": "https://schema.org/InStock"
                  },
              }
            )
             
          }}
        />


        <meta  name="robots" content="follow, index" />
        <meta  name="description" content={item.title} />
        <meta  property="og:site_name" content={item.title} />
        <meta  property="og:description" content={item.title} />
        <meta  property="og:title" content={item.title} />
        <meta  property="og:image" content={item.image} />
        <meta  name="twitter:card" content="summary_large_image" />
        <meta  name="twitter:site" content="@blendibox.br" />
        <meta  name="twitter:title" content={item.title} />
        <meta  name="twitter:description" content={item.title} />
        <meta  name="twitter:image" content={item.image} />


      </Head>
      <h2  >{item.brand}</h2>
       <h1  >{item.title}</h1>

 {
     item.offer == 'undefined' ? <h3  >Por {item.price}</h3> : item.pice == 'undefined'? <h3  >Por {item.offer}</h3>: <h3  > de <span className="caption"  > {item.offer}</span> por {item.price} </h3>
     

 }
  <p  >
           <a className="button"   href={item.link + item.afilio }> Quero Comprar 
            <amp-img  className="search" src="../../search.png"  placeholder="blur"
            width="25" height="25"></amp-img></a>
      </p>
     
     <a   href={item.link + item.afilio } > 
      <amp-img className="image"
        alt={item.title}
        width="350"
        height="350"
        placeholder="blur"
        
        src={item.image}
      >    
       
      </amp-img>
      </a>
       <p  >
           <a className="button"  href={item.link + item.afilio } 
        
           >
            Ir para o Site Oficial {item.brand}  <amp-img  className="search" src="../../search.png"  placeholder="blur"
        
            width="25" height="25"></amp-img></a>
      </p>


          <div class="containner vantagens">
            <h1>Qual o melhor site para comprar {item.title}?</h1>
            <h2> E quais as vantagens de comprar direto no Site Oficial da {item.brand}?</h2>
            O melhor lugar para comprar este produto é no Site oficial da Marca, e vou te explicar por quê: <br/><br/>
            A primeira vantagem é que, por estar comprando no <b>Site oficial {item.brand}</b>, automaticamente é eliminada todas as suas principais   dúvidas,
            como por exemplo:
            <br/> <b>Ter a certeza</b> de que o <b>Produto é Original</b>;
            <br/>Evitar que você precise levar <b>horas e horas</b> checando se o <b>Site é Confiável</b> antes de fechar
             a compra.<br/> 
             <br/>A segunda vantagem é o <b>Preço mais baixo</b>, por não existir custos de revenda. 
            <h3> Outras vantagens em compra direto no site oficial {item.brand} são:</h3>
            <br/> <b>Frete mais barato</b> e <b>Entrega mais rápida</b>: As grandes Marcas possuem um sistema lojístico robusto, o que <b>reduz o custo do frete</b> e <b>prazo 
             de entrega</b>;  
             <br/><br/><b>Garantia do fabricante</b>: Produtos de qualidade. Qualquer problema que tiver com o produto, tratará diretamente com a 
             empresa detendora da Marca.
           <br/> <br/><b>Troca ou Reembolso</b>: Caso precise <b>trocar o produto</b>, fará diretamente com a {item.brand}. Tudo de acordo com o
             <b> Código de Defesa do Consumidor</b>.
              <br/> <br/>
           Bem legal né?
              <br/><br/>
           Agora é só <b>comprar com segurança e tranquilidade</b>, esperar chegar no menor tempo, e curtir aquela sensação de abrir sua encomenda tão 
           esperada! :) <br/><br/>

             <b><a href={item.link + item.afilio}>Clique aqui </a></b> e confira todas estas vantagens, mais detalhes (deste e de outros produtos) no <b><a href={item.link + item.afilio}>site Oficial {item.brand}</a></b>.
          </div>
          
      <p  >
            </p>

     


    </div>

)   

  
}


export default casa_item