import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
	<title>Dicas de Compras Blendibox - Qual o melhor lugar para comprar?</title>
      <body>
        {children}
      </body>
    </html>
  );
}