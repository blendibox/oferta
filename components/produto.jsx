import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Video from './video'
import styles from './Produto.module.css'
import VideoBubble from './VideoBubble'

import SchemaProduto from './SchemaProduto';

export default function Produto(props) {
  const {
    title,
    image,
    link,
    video,
    priceGoogle,
    price,
    offer,
    descr,
	resultado_ia,
    imageWidth = 300,
    imageHeight = 450,
  } = props;

    return (
      <>
        <Head>
          <title>{title}</title>
		   <meta name="description" content={title}></meta>	   
          <SchemaProduto
			  title={title}
			  image={image}
			  link={link}
			  priceGoogle={priceGoogle}
			/>
        </Head>
 <div name="fundo" className={styles.AlignCenterMain} ></div>
    <main id="content" role="main" className={styles.AlignCenter}>

		<VideoBubble title="Nome do Produto | 3em1_puffer" />
		
          <br/>  
          <h1 className={styles.title}>Qual o melhor lugar para comprar <b>{title?.replace(/-/g, " ")}?</b></h1>


		  
        <div id="inicio" className={styles.containerTexto}>
		    <div id="fotoproduto" className={styles.fotoproduto}>
				  <Link href={link} className={styles.AlignCenter}>
					<Image
					  className={styles.image}
					  alt={title}
					  width={imageWidth || 350}
					  height={imageHeight || 'auto'}
					  src={image}
					  priority
					  fetchPriority='high'
					/>
				  </Link>
				
				
		    </div>

         

			<div id="comentarios" className={styles.AlignCenter}>
			    <Link  href={link}>
				  <div className={styles.balloonBoxContainner}>
				     <img   className={styles.balloonBoxImage} alt="foto de Renata" src="/images/avaliadores/2.webp" width="80" height="80"></img>
				     <div className={styles.balloonBox} >				
					      <p   className={styles.balloonBoxText}>⭐⭐⭐⭐⭐ <br/>Estou muito feliz com minha compra. A qualidade é incomparável!</p>
				      </div> 
				  </div>
				
				   <div className={styles.balloonBoxContainner}>
					  <img   className={styles.balloonBoxImage} alt="foto de Cristina" src="/images/avaliadores/viviane.webp" width="80" height="80"></img>
				      <div className={styles.balloonBox} >					
					     <p   className={styles.balloonBoxText}>⭐⭐⭐⭐⭐<br/>O design moderno e resistente superou minhas expectativas! o resultado faz com que quem use se sinta sendo da Realeza!</p>
				   </div> 
				 </div>				
				 <div className={styles.balloonBoxContainner}>
					<img   className={styles.balloonBoxImage} alt="foto de Helena" src="/images/avaliadores/4.webp" width="80" height="80"></img>
				    <div className={styles.balloonBox} >					
					   <p   className={styles.balloonBoxText}>⭐⭐⭐⭐⭐<br/> É perfeito! Recomendasíssimo! Com certeza compraria novamente!</p>
				    </div> 
				</div>
	
				</Link>
			</div>	
       <div >
	   	 <hr className={styles.hr}/>
		  <div className={styles.AlignCenter}>
					<br/>
				  {(offer || price) && <div className={styles.price}> Preço na data do Post:  <b> R$ {offer || price} * </b> 	  
				  <Link href={link} className={styles.link}>Clique Aqui	para saber o Valor Atual</Link></div>}
				  </div>
         <div id="texto" className={styles.containerTexto} >    
			  <div className={styles.compraSeguraContainer}>
				  <p>
				  Se você está pesquisando <strong>{title?.replace(/-/g, " ")} </strong> e caiu aqui, que sorte a sua! 💖<br/>
Eu fiz o trabalho pesado por você — pesquisei, comparei, conferi reputação, li avaliações e garanti que a indicação de te darei aqui, é o melhor lugar para comprar esse produto com tranquilidade, rapidez de entrega e o melhor custo-benefício!

				  </p>
				   <div id="fotoproduto" className={styles.fotoproduto}>
				  <Link href={link} className={styles.AlignCenter}>
					<Image
					  className={styles.image}
					  alt={title}
					  width={imageWidth || 350}
					  height={imageHeight || 'auto'}
					  src={image}
					  priority
					/>
				  </Link>
				  <br/>
				<Link href={link} className={styles.button}>CLIQUE PARA COMPRAR</Link>
				
		    </div>

				  <h2 className={styles.title}>💡 E por quê?</h2>

				  <ul>
					<li>
					  <span className={styles.emoji}>✅</span>
					  <strong>Garantia de produto original:</strong> Nada de correr riscos com falsificações ou réplicas. Comprando diretamente pelo botão azul, você tem a certeza de que está levando o produto verdadeiro, com a qualidade que a marca promete!
					</li>
					<li>
					  <span className={styles.emoji}>✅</span>
					  <strong>Compra segura e confiável:</strong> Sem precisar perder tempo verificando se o site é seguro, se vai receber certinho ou se o atendimento funciona.
					</li>
					<li>
					  <span className={styles.emoji}>✅</span>
					  <strong>Melhor custo-benefício:</strong> Preços mais justos no próprio site, sem intermediários, com cupons, combos e brindes exclusivos.
					</li>
					<li>
					  <span className={styles.emoji}>✅</span>
					  <strong>Entrega mais rápida e frete mais barato:</strong> Logística própria e frete com desconto. Menos espera, mais satisfação!
					</li>
					<li>
					  <span className={styles.emoji}>✅</span>
					  <strong>Atendimento direto com a Marca ou Loja Autorizada:</strong> Dúvidas, trocas ou reembolsos são resolvidos direto com a equipe de Vendas!
					</li>
					<li>
					  <span className={styles.emoji}>✅</span>
					  <strong>Política de troca garantida por lei:</strong> Tudo de acordo com o Código de Defesa do Consumidor.
					</li>
				  </ul>

				  <p  className={styles.finalDestaque}>Gostou da dica? 💖</p>
				  <p>Então deixa eu te contar um <b>segredinho:</b> quando você clica e compra pelo botão azul ou por qualquer link aqui deste post, além de aproveitar todas essas vantagens, você ainda me ajuda muito! 🙏<br/>

É isso mesmo: este post é <b>patrocinado</b>, isso significa que a Loja ou Marca me pagará uma pequena comissão — sem custo extra pra você — e isso me permite continuar pesquisando, testando  e compartilhando essas dicas incríveis com <b>VOCÊ</b>, e MUITO mais PESSOAS!
<br/>
Se essa dica te <b>poupou tempo</b>, te ajudou a <b>decidir</b>, evitou <b>dor de cabeça…</b> e ainda te fez sentir que eu ajudei de alguma forma...  <Link className={styles.link}  href={link}>Compre clicando neste link aqui</Link> ✨💗</p>

                       <Link className={styles.botaoCompra} href={link}>
					  👉 SAIBA MAIS!
					  </Link>
				


                <div ><br/>	
					<div className={styles.balloonBoxContainner} >
					
						<img   className={styles.balloonBoxImage} alt="imagem check" src="/images/avaliadores/check.png" width="80" height="80" ></img>
							<div className={styles.balloonBox} >
										<Link href='https://www.blendibox.com.br' className={styles.AlignCenter} alt="Ir para Blendibox">
							<p   className={styles.balloonBoxText}>
								Somos a <b>Blendibox</b>, especializada em bolsas que unem praticidade, estilo e qualidade.
					Também atuamos com marketing digital desde <b>2012</b> e carregamos uma paixão por Comércio Eletrônico, <b>Pesquisa</b> e <b>Testes de Produtos</b>, os quais fazemos de forma genuína, útil e inovadora. Compartilhamos tudo o que achamos <b>Relevante</b> para você, com <b>Empatia</b> e <b>Transparência</b>.
					</p>
					</Link>
				   </div> 
				</div>
				  
			</div>							
		</div>
	 </div>	
	   <div className={styles.AlignCenter}>
		 <div  className={styles.assinatura} aria-label="Data da publicação" >					  
            <time dateTime="2025-07-07">*Julho 07, 2025 </time><br/>
			<Link href='https://www.blendibox.com.br' className={styles.AlignCenter}>
					     © 2025, Blendibox.
			</Link>
			
		 </div>
		 </div>
	</div>
  </div>
         
        </main>
      </>
    );
  }
