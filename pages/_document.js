import Document, { Html, Head, Main, NextScript,Link } from 'next/document';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {

    return (
      <Html lang="pt">
        <Head>


         <link rel="alternate" type="application/rss+xml" href="https://comprar.blendibox.com.br/googleMerchant.xml" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <meta name="theme-color" content="#e7e9eb"/>
          <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js" />
          <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"/>
          <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"/>
          <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"/>
          <script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"/>
          <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"/>
          <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"/>      
          <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"/>
          <script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js"/>
          <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"/>
         
          <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
          
          <meta name="msvalidate.01" content="13BC51958165F779625DD28F673D5B4A"/>
          <meta name="verify-admitad" content="547987f230" />
          <meta httpEquiv='content-language' content='pt-br'/> 
          <link rel="preload" href="https://comprar.blendibox.com.br/Poppins-Regular.woff" as="font" crossOrigin="true"/>
          <meta name="description" content="Aqui Você encontra dicas dos melhores sites de compras e cupons de desconto imperdíveis"/>


       
        </Head>

        <body>
        <amp-analytics config="https://www.googletagmanager.com/amp.json?id=GTM-PS2T3XB&gtm.url=SOURCE_URL" data-credentials="include"></amp-analytics>


            <header
      className="ampstart-headerbar fixed flex justify-start items-center top-0 left-0 right-0 pl2 pr4"
    >
      <div
        role="button"
        aria-label="open sidebar"
        on="tap:header-sidebar.toggle"
        tabIndex="0"
        className="ampstart-navbar-trigger pr2"
      >
        ☰
      </div>

    </header>


        <Sidebar />
          

          <Main />
          <NextScript />

          <Footer>

          </Footer>

        </body>
      </Html>
    );
  }
}

export default MyDocument;