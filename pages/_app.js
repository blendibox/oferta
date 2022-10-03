import '../styles/globals.css'
import  '../styles/output.css'

import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    hotjar.initialize(process.env.HOTJAR_CODE, 1)
  }, [])


  return <Component {...pageProps} />
}

export default MyApp
