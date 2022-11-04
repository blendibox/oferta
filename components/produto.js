import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

class Produto extends React.Component {



render() {


  return (


     <main id="content" role="main" >
      <article >
        <header>
          <title  >{this.props.title}</title>

          <script   type="application/ld+json"  
          dangerouslySetInnerHTML=
               {{ __html: JSON.stringify( 

                {
                  "@context": "https://schema.org/", 
                  "@type": "Product", 
                  "name": this.props.title,
                  "image": this.props.image,
                  "url": this.props.link,
                  "description": "Procurando onde comprar " + this.props.title + ' original? '+process.env.GATILHO_MENTAL + ' Oferta exclusiva ' + this.props.title,
                  "brand": {
                    "@type": "Brand",
                    "name": this.props.brand.replace('-',' ')
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


        <span >{this.props.brand.replace('-',' ')}</span>
         <h2>Qual o melhor site para comprar</h2>
         <h1>{this.props.title.replace('-',' ')}?</h1>
          
          
          <address >
            <time
              dateTime="2022-10-13"
              >Outubro 19, 2022</time
            >
          </address>
          


         <a   href={this.props.link  } > 
           <amp-img className="image"
            alt={this.props.title}
            width={ this.props.imageWidth ? this.props.imageWidth : 350}
            height={ this.props.imageHeight ? this.props.imageHeight : 350}
            placeholder="blur"
            layout="responsive"
            src={this.props.image}
          >         
          </amp-img>
        </a>


      { this.props.image2 && 
        <section>
           <hr/>
            <amp-carousel
              type="carousel"
              layout="fixed-height"
              height="205"
              controls=""
              className="mb4"
            >
             { (this.props.image2 !== '') && 
                 <amp-img
                src={this.props.image2}
                width="205"
                height="205"
                alt={this.props.title}
              ></amp-img>

             } 
             { (this.props.image3 !== '') && 
                 <amp-img
                src={this.props.image3}
                width="205"
                height="205"
                alt={this.props.title}
              ></amp-img>

             }
              { (this.props.image4 !== '') && 
                 <amp-img
                src={this.props.image4}
                width="205"
                height="205"
                alt={this.props.title}
              ></amp-img>

             }
              { (this.props.image5 !== '') && 
                 <amp-img
                src={this.props.image5}
                width="205"
                height="205"
                alt="Want1"
              ></amp-img>

             }
              { (this.props.image6 !== '') && 
                 <amp-img
                src={this.props.image6}
                width="205"
                height="205"
                alt={this.props.title}
              ></amp-img>

             }
              
            </amp-carousel>
            <hr/>
        </section>
      }
      

         
      
        </header>
        <p className="AlignCenter">



 {
     (this.props.offer == 'undefined' || this.props.offer == '') ? <h3 className="price" >Por {this.props.price}</h3> : (this.props.price == 'undefined' || this.props.price == '') ? <h3 className="price" >Por {this.props.offer}</h3>: <h3 className="price" > de <span className="caption"  > {this.props.price}</span> por {this.props.offer} </h3>
     

 }
       


      <p className="AlignCenter"> <br/> <a className="button"  href={this.props.link  } 
        
           >
            Ir para o Site {this.props.brand.replace('-',' ')}<amp-img  className="search" src="../../arrow-right.png" alt="ir"  placeholder="blur"
        
            width="20" height="20"></amp-img></a>
          
      </p>

    

      <div className="">
         
            <br/>
            <h2> Quais as vantagens de comprar direto no Site da {this.props.brand.replace('-',' ')}?</h2><br/>
            O melhor lugar para comprar este produto é no Site da Blendibox, e vou te explicar por quê: <br/><br/>
            A primeira vantagem é que, por estar comprando no <b>Site {this.props.brand.replace('-',' ')}</b>, automaticamente é eliminada todas as suas principais   dúvidas,
            como por exemplo:<br/>
            <br/> <b>Ter a certeza</b> de que o <b>Produto é Original</b>;
            <br/>Evitar que você precise levar <b>horas e horas</b> checando se o <b>Site é Confiável</b> antes de fechar
             a compra.<br/> 
             <br/>A segunda vantagem é o <b>Preço mais justo</b>, por se tratar de um site que se preocupa em oferecer o melhor custo-benefício. <br/><br/>
            <h3> Outras vantagens em compra direto no site {this.props.brand.replace('-',' ')} são:</h3>
            <br/> <b>Frete mais barato</b> e <b>Entrega mais rápida</b>: Grandes Varejistas possuem um sistema lojístico robusto, o que <b>reduz o custo do frete</b> e <b>prazo 
             de entrega</b>;  
             <br/><br/><b>Garantia do fabricante</b>: Produtos de qualidade. Qualquer problema que tiver com o produto, tratará diretamente com a 
             empresa responsável pelo site em que finalizou a compra.
           <br/> <br/><b>Troca ou Reembolso</b>: Caso precise <b>trocar o produto</b>, fará diretamente com a {this.props.brand.replace('-',' ')}. Tudo de acordo com o
             <b> Código de Defesa do Consumidor</b>.
              <br/> <br/>
           Bem legal né?
              <br/><br/>
           Agora é só <b>comprar com segurança e tranquilidade</b>, esperar chegar no menor tempo, e curtir aquela sensação de abrir sua encomenda tão 
           esperada! :) <br/><br/>

             <b><a href={this.props.link}>Clique aqui  e confira todas estas vantagens</a></b>, mais detalhes (deste e de outros produtos) no <b><a href={this.props.link }>site {this.props.brand.replace('-',' ')}</a></b>.
          


      </div>

    </p>
        </article>

         <style jsx>{`

        @media only screen and (min-width: 500px){
          .button{
            margin-top:10px;
            margin-bottom:20px;
            width:100%
          }
        }
        @media only screen and (max-width: 499px){
          .button{
            margin-top:10px; 
            margin-bottom:20px;          
            width:100%
          }
        }
        .AlignCenter{
           text-align:center;
        }
       
        .brand{
          color: #ffffff;
          font-color:#ffffff;
        }


        }


        
       `}</style>
        </main>
 




       
  	)

  }

 }

export default Produto;