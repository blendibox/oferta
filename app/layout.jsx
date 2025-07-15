import "./globals.css";
import MenuPrincipal from '../components/MenuPrincipal';
import ResultadosFiltrados from '../components/ResultadosFiltrados';
import CompararProdutos    from '../components/CompararProdutos';
import BreadcrumbCategoria from '../components/BreadcrumbCategoria';
import Footer    from '../components/footer';
import { Suspense } from 'react';

export const metadata = {
  title: 'Blendibox Ofertas',
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
		<head>
		   <meta charSet="UTF-8" />
		   <link rel="alternate" type="application/rss+xml" href="https://comprar.blendibox.com.br/googleMerchant_1.xml" />
		   <meta name="msvalidate.01" content="13BC51958165F779625DD28F673D5B4A"></meta>
		   <meta name="verify-admitad" content="547987f230" ></meta>
		   <meta name="lomadee" content="2324685" ></meta>
		   <meta name="lomadee-verification" content="23108504" ></meta>
		   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</head>   
        <body className="flex min-h-screen  relative z-0 overflow-visible">
		 <div className="flex w-full">
		   <Suspense fallback={<div>Carregando busca...</div>}>	
	          <MenuPrincipal />	
           </Suspense>			
		    <div className="flex-1 max-w-7xl mx-auto px-4">
		      <div className="max-w-7xl mx-auto px-4">
			  	     <h2 className="text-2xl font-semibold mb-4 capitalize mt-6">
						<BreadcrumbCategoria/>							
					  </h2>
				  
				  <ResultadosFiltrados />
				  <div className="m-10"><hr /></div>	
                    <Suspense fallback={<div>Carregando busca...</div>}>				  
				      <CompararProdutos/>
				    </Suspense>
				  <main className="mt-8">
					{children}
				  </main>
			  </div>
			  <Footer/>
            </div>
			
		 </div>
        </body>
    </html>
  );
}