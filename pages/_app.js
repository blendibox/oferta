import '../styles/globals.css'
import  '../styles/output.css'
import Layout from '../components/layout';
import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    hotjar.initialize(process.env.HOTJAR_CODE, 1)
  }, [])


  return  <Layout>
         <Component {...pageProps} />
         </Layout>
}

export default MyApp
