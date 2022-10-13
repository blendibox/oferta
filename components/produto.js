import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

class Produto extends React.Component {



render() {


  return (

    <div className="containner">
      <Head>
        <title  >{this.props.title}</title>
         <script    type="application/ld+json"  dangerouslySetInnerHTML={{ __html: JSON.stringify(

                {
                  "@context": "https://schema.org/", 
                  "@type": "Product", 
                  "name": this.props.title,
                  "image": this.props.image,
                  "url": this.props.link,
                  "description": "Procurando onde comprar " + this.props.title + ' original? '+process.env.GATILHO_MENTAL + ' Oferta exclusiva ' + this.props.title,
                  "brand": {
                    "@type": "Brand",
                    "name": this.props.brand
                  },

                  "offers": {
                    "@type": "Offer",
                    "url": this.props.link,
                    "priceCurrency": "BRL",
                    "price":  this.props.priceGoogle,
                    "itemCondition": "https://schema.org/NewCondition",
                    "availability": "https://schema.org/InStock"
                  },
              }
            )
             
          }}
        />


        <meta  name="robots" content="follow, index" />
        <meta  name="description" content={this.props.title} />
        <meta  property="og:site_name" content={this.props.title} />
        <meta  property="og:description" content={this.props.title} />
        <meta  property="og:title" content={this.props.title} />
        <meta  property="og:image" content={this.props.image} />
        <meta  name="twitter:card" content="summary_large_image" />
        <meta  name="twitter:site" content="@blendibox.br" />
        <meta  name="twitter:title" content={this.props.title} />
        <meta  name="twitter:description" content={this.props.title} />
        <meta  name="twitter:image" content={this.props.image} />


      </Head>
      

      <h2>Qual o melhor site para comprar</h2>
      <h1>{this.props.title}?</h1>
          

      <p> <a className="button"  href={this.props.link  } 
        
           >
            Ir para o Site Oficial {this.props.brand}<amp-img  className="search" src="../../arrow-right.png"  placeholder="blur"
        
            width="20" height="20"></amp-img></a>
          
      </p>
      <h2  >{this.props.brand}</h2>
     <a   href={this.props.link  } > 
      <amp-img className="image"
        alt={this.props.title}
        width="350"
        height="350"
        placeholder="blur"
        
        src={this.props.image}
      >    
       
      </amp-img>

 {
     (this.props.offer == 'undefined' || this.props.offer == '') ? <h3  >Por {this.props.price}</h3> : (this.props.price == 'undefined' || this.props.price == '') ? <h3  >Por {this.props.offer}</h3>: <h3  > de <span className="caption"  > {this.props.offer}</span> por {this.props.price} </h3>
     

 }
      </a>
       <p  >
       <a className="button"   href={this.props.link  }> Quero saber mais  
            <amp-img  className="search" src="../../search.png"  placeholder="blur" width="25" height="25"></amp-img>
           </a>
          
      </p>


          <div className="containner vantagens">
         

          <h1  >{this.props.title}</h1>
           
            <h2> Quais as vantagens de comprar direto no Site Oficial da {this.props.brand}?</h2>
            O melhor lugar para comprar este produto é no Site oficial da Marca, e vou te explicar por quê: <br/><br/>
            A primeira vantagem é que, por estar comprando no <b>Site oficial {this.props.brand}</b>, automaticamente é eliminada todas as suas principais   dúvidas,
            como por exemplo:
            <br/> <b>Ter a certeza</b> de que o <b>Produto é Original</b>;
            <br/>Evitar que você precise levar <b>horas e horas</b> checando se o <b>Site é Confiável</b> antes de fechar
             a compra.<br/> 
             <br/>A segunda vantagem é o <b>Preço mais baixo</b>, por não existir custos de revenda. 
            <h3> Outras vantagens em compra direto no site oficial {this.props.brand} são:</h3>
            <br/> <b>Frete mais barato</b> e <b>Entrega mais rápida</b>: As grandes Marcas possuem um sistema lojístico robusto, o que <b>reduz o custo do frete</b> e <b>prazo 
             de entrega</b>;  
             <br/><br/><b>Garantia do fabricante</b>: Produtos de qualidade. Qualquer problema que tiver com o produto, tratará diretamente com a 
             empresa detendora da Marca.
           <br/> <br/><b>Troca ou Reembolso</b>: Caso precise <b>trocar o produto</b>, fará diretamente com a {this.props.brand}. Tudo de acordo com o
             <b> Código de Defesa do Consumidor</b>.
              <br/> <br/>
           Bem legal né?
              <br/><br/>
           Agora é só <b>comprar com segurança e tranquilidade</b>, esperar chegar no menor tempo, e curtir aquela sensação de abrir sua encomenda tão 
           esperada! :) <br/><br/>

             <b><a href={this.props.link}>Clique aqui </a></b> e confira todas estas vantagens, mais detalhes (deste e de outros produtos) no <b><a href={this.props.link }>site Oficial {this.props.brand}</a></b>.
          


          </div>
          
      <p  >
            </p>



      </div>
  	)

  }

 }

export default Produto;