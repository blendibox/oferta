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
    imageWidth = 300,
    imageHeight = 450,
  } = props;

    return (
      <>
        <Head>
          <title>{title}</title>
          <SchemaProduto
			  title={title}
			  image={image}
			  link={link}
			  priceGoogle={priceGoogle}
			/>
        </Head>

        <main id="content" role="main" className={styles.AlignCenter}>
		<VideoBubble title="Nome do Produto | 3em1_puffer" />
		
  <br/>
          <h1 className={styles.title}>Qual o melhor lugar para comprar <b>{title?.replace(/-/g, " ")}?</b></h1>

          
          <div>

            {video ? <Video src={video} image={image} /> : <Video src="imagine_como_seria.mp4" image={image} />}
          </div>


          <br />

          <Link href={link} className={styles.AlignCenter}>
            <Image
              className={styles.image}
              alt={title}
              width={imageWidth || 350}
              height={imageHeight || 350}
              src={image}
            />
          </Link>

          <div className={styles.AlignCenter}>
<br/>
		  {(offer || price) && <div className={styles.grid}> Preço na data do Post:   <b> R${offer || price} *</b></div>}


            <div className={styles.AlignCenter}>
              <br />
              <Link className={styles.button} href={link}>
                Ir para o Site 
            
              </Link>
            </div>

            <div >
              <br />
              {typeof descr !== "undefined" && (
                <div>
                  <h4>&nbsp;{descr[0]}</h4>
                </div>
              )}

			  <div className={styles.compraSeguraContainer}>
				  <p>
				  Se você estava pesquisando <strong>{title?.replace(/-/g, " ")} </strong> e caiu aqui, que sorte a sua! 💖
Eu fiz o trabalho pesado por você — pesquisei, comparei, conferi reputação, li avaliações e garanti que este é o melhor lugar para comprar esse produto com tranquilidade, rapidez e o menor preço.

				  </p>

				  <h3>💡 E por quê?</h3>

				  <ul>
					<li>
					  <span className={styles.emoji}>✅</span>
					  <strong>Garantia de produto original:</strong> Nada de correr riscos com falsificações ou réplicas. Comprando diretamente pelo Site, você tem a certeza de que está levando o produto verdadeiro, com a qualidade que a marca promete!
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
				  <p>Então deixa eu te contar um <b>segredinho:</b> quando você clica e compra pelo link aqui deste post, além de aproveitar todas essas vantagens, você ainda me ajuda muito! 🙏<br/>

É isso mesmo: este post é <b>patrocinado</b>,isso significa que a Loja ou Marca me pagará uma pequena comissão — sem custo extra pra você — e isso me permite continuar testando, pesquisando e compartilhando essas dicas incríveis com <b>VOCÊ</b>, e MUITO mais PESSOAS!
<br/>
Se essa dica te <b>poupou tempo</b>, te ajudou a <b>decidir</b>, e evitou dor de cabeça… É hora da etapa que eu mais amo💗! <br/>Compre clicando neste link abaixo: ✨💗</p>

                       <Link className={styles.botaoCompra} href={link}>
					  👉 Clique Aqui e COMPRE {title?.replace("-", " ")}!
					  </Link>
				

				  <div  className={styles.assinatura}  >
			  <div aria-label="Data da publicação">
			    <Link  href="https://www.blendibox.com.br">
	            <time dateTime="2025-06-29">*Junho 29, 2025 por Juliana Costa</time>
				</Link>
          </div>

				   <Link href='https://www.blendibox.com.br' className={styles.AlignCenter}>
					   Blendibox - 2025
					  </Link>
				  </div>
				</div>
             </div>
          </div>
        </main>
      </>
    );
  }
