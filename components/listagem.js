import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

class Listagem extends React.Component {



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
                  "image": this.props.image.replace('?v=1752766370',''),
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
        <meta  property="og:image" content={this.props.image.replace('?v=1752766370','')} />
        <meta  name="twitter:card" content="summary_large_image" />
        <meta  name="twitter:site" content="@blendibox.br" />
        <meta  name="twitter:title" content={this.props.title} />
        <meta  name="twitter:description" content={this.props.title} />
        <meta  name="twitter:image" content={this.props.image.replace('?v=1752766370','')} />


        <span >{this.props.brand.replace('-',' ')}</span>
         <h1>{this.props.title.replace('-',' ')}</h1><br/>
          
          
         
 {
     (this.props.offer == 'undefined' || this.props.offer == '') ? <h3  >Por {this.props.price}</h3> : (this.props.price == 'undefined' || this.props.price == '') ? <h3  >Por {this.props.offer}</h3>: <h3> de <span className="caption"  > {this.props.offer}</span> por {this.props.price} </h3>
     

 }
          
       <p className="AlignCenter"> <br/> <Link className="button"  href={this.props.link  } 
        
           >
            Ir para o Site {this.props.brand.replace('-',' ')}<amp-img  className="search" src="../../arrow-right.png" alt="ir" placeholder="blur"
        
            width="20" height="20"></amp-img></Link>
          
      </p>
         <p className="AlignCenter"> <br/> 
         <Link   href={this.props.link  } > 
           <amp-img className="image"
            alt={this.props.title}
            width={ this.props.imageWidth ? this.props.imageWidth : 350}
            height={ this.props.imageHeight ? this.props.imageHeight : 350}
            placeholder="blur"
            src={this.props.image.replace('?v=1752766370','')}
          >         
          </amp-img>
        </Link>
         </p>
      
        </header>



      <p className="AlignCenter"> <br/> <Link className="button"  href={this.props.link  } 
        
           >
            Ir para o Site  {this.props.brand.replace('-',' ')}<amp-img  className="search" src="../../arrow-right.png" alt="ir" placeholder="blur"
        
            width="20" height="20"></amp-img></Link>


       
          
      </p>

    

        <p >
          <br/>
         <hr/>

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

export default Listagem;