'use client';

import React from 'react'
import Head from 'next/head';


export class CanonicalURL extends React.Component {


    static async getInitialProps(context) {
        // Using context prop to get asPath, query, context
        const {asPath, query, pathname} = context 
        return{asPath, query, pathname}
    }

 

  render() {
    
    console.log(this.props.asPath);

    <Head>

        <link rel="canonical" href={"https://comprar.blendibox.com.br/" + this.props.asPath}    key="canonical"/>

    </Head>
  }

  
 }


export default CanonicalURL