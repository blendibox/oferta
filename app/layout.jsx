import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}