import "./globals.css";
import MenuPrincipal from '../components/MenuPrincipal';
import ResultadosFiltrados from '../components/ResultadosFiltrados';
import CompararProdutos    from '../components/CompararProdutos';
import BreadcrumbCategoria from '../components/BreadcrumbCategoria';
import Footer    from '../components/footer';
import { Suspense } from 'react';
import Clarity from '@microsoft/clarity';


const projectId = "gljrxgwcmh"

Clarity.init(projectId);

export const metadata = {
  title: 'Blendibox Ofertas',
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
		<head>
		   <meta charSet="UTF-8" />
		   <link rel="alternate" type="application/rss+xml" href="https://comprar.blendibox.com.br/googleMerchant_1.xml" />
		   <link rel="preload" fetchPriority="high" as="image" href="/images/banner.webp" type="image/webp"></link>	   
		   <meta name="msvalidate.01" content="13BC51958165F779625DD28F673D5B4A"></meta>
		   <meta name="verify-admitad" content="547987f230" ></meta>
		   <meta name="lomadee" content="2324685" ></meta>
		   <meta name="lomadee-verification" content="23108504" ></meta>
		   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		   <script
			  type="application/ld+json"
			  dangerouslySetInnerHTML={{
				__html: JSON.stringify({
				  "@context": "https://schema.org",
				  "@type": "WebSite",
				  "url": "https://comprar.blendibox.com.br/",
				  "potentialAction": {
					"@type": "SearchAction",
					"target": "https://comprar.blendibox.com.br/busca?{search_term_string}",
					"query-input": "required name=search_term_string"
				  }
				})
			  }}
			/>
		</head>   
        <body className="flex min-h-screen  relative z-0 overflow-visible">
		   <div className="flex w-full">
			   <Suspense fallback={<div>Carregando busca...</div>}>	
				  <MenuPrincipal />	
			   </Suspense>			
				<div className="flex-1 max-w-10/10 mx-auto">
				  <div className="max-w-10/10 mx-auto">			
					<h2 className="text-2xl font-semibold mb-4 capitalize mt-6 ml-16">
						<BreadcrumbCategoria/>							
					</h2>
					<div className="ml-6 mr-6">
					  <ResultadosFiltrados />
					</div>
					<main className="mt-8">
						{children}
					</main>
					<Suspense fallback={<div>Carregando busca...</div>}>				  
						  <CompararProdutos/>
					</Suspense>				  
				  </div>
				  <Footer/>
				</div>
		   </div>
        </body>
    </html>
  );
}