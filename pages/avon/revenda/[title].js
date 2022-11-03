import  Produto  from '../../../components/produto'
import styles from '../../../styles/Home.module.css'
import revenda from '../../../data/palavra-chave-avon-revender.json'


export const config = { amp: true };




export const getStaticProps = async ({params: {title} }) =>{

	const revendas = revenda.filter(p =>p.title.toString() == title)


   return {
    props: {
      item: revendas[0],

    }
   }
}


export const getStaticPaths = async()=>{
	const paths = revenda.map(item =>({
		params: {title: item.title.toString()},
	}))
	return {paths,fallback: false}
}

 function revenda_item({item}) {

  return(


    


    <main id="content" role="main" >
      <article >
        <header>
          <span >AVON</span>
          <h1>{item.title.replace(/^./, item.title[0].toUpperCase())}</h1>

          
          <address >
            <time
              dateTime="2022-10-13"
              >Outubro 13, 2022</time
            >
          </address>
          
          <amp-img
            src="../../big_pro_2.webp"
            width="200"
            height="200"
            layout="responsive"
            alt="The final spritzer"
           
          ></amp-img>
        </header>
        <p >
         <h1>Quer saber sobre <a href="https://www.avon.com.br/?utmi_pc=74806588">{item.title}</a>?</h1>
<br/>
  <h3>Melhor Resposta: Produtos da AVON</h3>
<br/>  
     
       As maquiagens e cosméticos da <b> <a href="https://www.avon.com.br/?utmi_pc=74806588">AVON</a></b> são reconhecidas como os mais vendidos no mundo.
       E no Brasil nã é diferente: a cada dois batons vendidos no Brasil, um é da Avon. Os dados constam do Painel de Consumidores de 2014 da Kantar World Panel, especializada em monitoramento e análise do mercado.
<br/>
     Ao revender Avon, você adquire os produtos com margem de no mínimo 20% de lucro, e o valor mínimo para fazer um pedido é de R$ 110,00 reais.
     <br/>
     A Avon conta com uma bela novidade: uma plataforma para revenda online chamada Avon Conecta, onde o pedido é enviado para a cliente diretamente pela Avon.

  <div className="button_Avon ">
    <h2> Quero Revender, como faço?</h2>
    <br/>
    Se cadastrar como Consultora de Vendas da Avon é bem simples e rápido: preencha seu cadastro com seus dados pessoais diretamente no site da Avon, siga os passos, e aguarde seu cadastro ser liberado. 
    Algumas vezes o cadasto é liberado para fazer o primeiro pedido no mesmo dia. Clique no botão abaixo para ir ao formulário de cadastro no site da Avon.
<br/><br/>

 <a className="button" href="https://www.avon.com.br/institucional/seja-representante/cadastro?codigo-self-appointment=74806588" >
            Ir para o Cadastro na Avon<amp-img  className="search" src="../../arrow-right.png"  placeholder="blur"
        
            width="25" height="25"></amp-img></a><br/><br/>

  </div>
   <div className="button_Avon">
      <h2> Como faço para comprar?</h2>    
<br/>
      Você pode utilizar minha página do Avon Conecta para comprar seus produtos para uso próprio. Assim você conhece a nova ferramenta, e tem a vantagem de receber seus produtos enviados diretamente pela Avon. <br/>
 Clique no botão abaixo para comprar seus produtos no site da Avon. <br/><br/>
 <a className="button" href="https://www.avon.com.br/?utmi_pc=74806588" >
            Ir às Compras no Site da Avon<amp-img  className="search" src="../../arrow-right.png"  placeholder="blur"
        
            width="25" height="25"></amp-img></a>
       
   </div>
<br/>
             <section>
            <h2 className="mb4">Veja alguns Produtos:</h2>
            <amp-carousel
              type="carousel"
              layout="fixed-height"
              height="205"
              controls=""
              className="mb4"
            >
              <amp-img
                src="../../big_pro_2.webp"
                width="205"
                height="205"
                alt="Want1"
              ></amp-img>
              <amp-img
                src="../../big_pro.webp"
                width="205"
                height="205"
                alt="Want2"
              ></amp-img>
               <amp-img
                src="../../maleta.webp"
                width="205"
                height="205"
                alt="Want2"
              ></amp-img>
               <amp-img
                src="../../lov_u_touch.webp"
                width="205"
                height="205"
                alt="Want2"
              ></amp-img>
               <amp-img
                src="../../protetor_solar_cor.webp"
                width="205"
                height="205"
                alt="Want2"
              ></amp-img>
               <amp-img
                src="../../batom_tratamake.webp"
                width="205"
                height="205"
                alt="Want2"
              ></amp-img>
               <amp-img
                src="../../hialuronico.webp"
                width="205"
                height="205"
                alt="Want2"
              ></amp-img>
               <amp-img
                src="../../renew_vitaminado.webp"
                width="205"
                height="205"
                alt="Want2"
              ></amp-img>
              
            </amp-carousel>
          </section>
           <br/>
          <small>
          Produtos nas imagens: Paleta Big pró,  Maleta de Maquiagem Avon, Lov U Touch,  Protetor Solar com Cor,  Batom Tratamake, Sérum Facial Renew e Kit Renew Vitaminado (VItamina C)
          </small>
          <br/><br/>

<div>Mais detalhes sobre {item.title}, você encontra no <b><a href="https://www.avon.com.br/?utmi_pc=74806588"> SITE DA AVON</a></b> </div>




        </p>
        </article>

         <style jsx>{`

        @media only screen and (min-width: 500px){
          .button_Avon{
            margin-top:10px;
            width:100%
          }
        }
        @media only screen and (max-width: 499px){
          .button_Avon{

              margin-top:10px;
            width:100%
          }
        }

        .right{
          position:relative;

        }
        
       `}</style>
        </main>
 
  
    




)   

  
}


export default revenda_item