import styles from '../../styles/Home.module.css'

export const config = { amp: true };




export const getStaticProps = async ({params: {id} }) =>{

  const CuponsList = await fetch(
    "http://sandbox-api.lomadee.com/v2/1666449730458ebdc157f/coupon/_all?sourceId=37683570"
  )


  const posts = await CuponsList.json()


  const data = posts.coupons.filter(p =>p.id.toString() == id)


    console.log(data);
    
   return {
    props: {
      item:  data[0]
    }
   }

  
}


var count = 0;



export const getStaticPaths = async()=>{

  const res = await fetch("http://sandbox-api.lomadee.com/v2/1666449730458ebdc157f/coupon/_all?sourceId=37683570")
  const posts = await res.json()

  const paths = posts.coupons.map((post) => ({
    params: {id: post.id.toString()},
  }))



  return { paths, fallback: false }


}



 function Cupons( props)  {



  return (

    <>

    <h1>{props.item.description}</h1><br/><br/>
             
        /*<amp-story title={props.item.description}  key={props.item.id}           
            poster-portrait-src="../../images/cupom1.gif" 
            publisher="Blendibox" 
            publisher-logo-src="../../blendibox.webp" 
            standalone="">
               
              <amp-story-page id={count++}  key={count++}>
               <amp-story-grid-layer template="fill"   key={count++} position="landscape-half-left">
                 <amp-img
                src="../../images/cupom1.gif"
                width="120"
                height="200"
                alt="props.item.description"
               
                ></amp-img>

               </amp-story-grid-layer>



              <amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">{props.item.code}</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>

               <amp-story-grid-layer template="vertical" position="landscape-half-left">
                Loja: <br/>
                <hr/>
                
       
               </amp-story-grid-layer>



               </amp-story-page>                   
          </amp-story>
          */
         

          </>
         
    
    

  );
}




export default Cupons