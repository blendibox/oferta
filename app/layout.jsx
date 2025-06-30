import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
	<title>Dicas de Compras Blendibox - Qual o melhor lugar para comprar?</title>
	<meta name="description" content="Bolsas 3 em 1, mochilas e acessórios pensados para mulheres práticas. Na Blendibox você encontra estilo, funcionalidade e qualidade com preço justo">
	</meta>
      <body>
        {children}
      </body>
    </html>
  );
}