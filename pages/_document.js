import Document, { Html, Head, Main, NextScript } from 'next/document';
import Sidebar from '../components/sidebar';


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {

    return (
      <Html>
        <Head>
          <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js" />
          <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"/>
          <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"/>
          <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"/>
          <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"/>
          <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"/>
          <script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"/>
          <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"/>
          <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"/>
          <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"/>
          <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"/>
          <script async custom-element="amp-video"   src="https://cdn.ampproject.org/v0/amp-video-0.1.js"/>
   

         

        </Head>
         <style jsx>{`


        .button:hover {
          animation-name: shake;
          animation-duration: 0.82s;

          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0);
          }
          
          20%, 80% {
            transform: translate3d(2px, 0, 0);
          }

          30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
          }

          40%, 60% {
            transform: translate3d(4px, 0, 0);
          }
        }

        .containner{
          text-align:center;
          font-family: Poppins;
        }
        h1, h2 {
          margin: 5px;
           font-family: Poppins;
        }
        h2{
          color:#222222;
        }
        a{
          text-decoration:none;
          color:#222222;
        }
        .search{
          top:4px;
        }
        .image{
         
        }
        .button{
          background-color:#f05395;
          color:#ffffff;
          font-size:1.1em;
          border-radius:8px;
          padding: 5px 5px 5px 5px;
          
        }
        p {
          font-size: 18px;
          line-height: 30px;
          margin-top: 30px;
           font-family: Poppins;
        }
        .caption {
          color: #444444;
          margin-top: 0;
          font-size: 14px;
          text-decoration: line-through;
          text-align: center;
        }
      `}</style>
        <body>
          <Sidebar />




          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;