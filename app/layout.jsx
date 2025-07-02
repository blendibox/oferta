import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
	   <title>Dicas de Compras Blendibox - Qual o melhor lugar para comprar?</title>
	    <link rel="alternate" type="application/rss+xml" href="https://comprar.blendibox.com.br/googleMerchant_1.xml" />
	   <meta name="msvalidate.01" content="13BC51958165F779625DD28F673D5B4A"></meta>
       <meta name="verify-admitad" content="547987f230" ></meta>
	   <meta name="lomadee" content="2324685" ></meta>
       <meta name="lomadee-verification" content="23108504" ></meta>
	   <meta name="description" content="Bolsas 3 em 1, mochilas e acessórios pensados para mulheres práticas. Na Blendibox você encontra estilo, funcionalidade e qualidade com preço justo">
	   </meta>
      <body>
        {children}
      </body>
    </html>
  );
}