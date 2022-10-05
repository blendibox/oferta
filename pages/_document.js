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

        <body>
          <Sidebar />
            <button on="tap:sidebar.toggle" className="sidebar-trigger">
             &#9776;
           </button>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;