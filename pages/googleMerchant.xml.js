const Sitemap = () => null;
import  make  from "../data/avon-make.json";

export const getServerSideProps = async ({ res }) => {
  // Fetch data and build page content ...

var produtos  = '';

 const product = await make;


var produtos =   product.map((post,i) => 
  `<item><title><![CDATA[ ${post.title}]]></title><link><![CDATA[${post.link + post.afilio}]]></link><description><![CDATA[${post.title}]]></description>`+
  `<g:image_link>${post.image}</g:image_link><g:price><![CDATA[${post.price}]]></g:price><g:condition>new</g:condition>` +
  `<g:availability>in stock></g:availability> <g:item_group_id><![CDATA[${post.brand}]]>></g:item_group_id><g:installment><g:months>3</g:months>` +
  `<g:amount><![CDATA[${post.price} BRL]]></g:amount></g:installment><g:brand><![CDATA[${post.brand}]]></g:brand><g:product_type><![CDATA[Maquiagem ]]></g:product_type> ` +
  `<g:identifier_exists>FALSE</g:identifier_exists><g:online_only>y</g:online_only>` +
  `</item>`

  );


var result ='';
 produtos.forEach((post) =>{
     result = result + post;

 });



  var content = `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Blendibox - Comprar online</title>
    <link>https://comprar.blendibox.com.br</link>
    <description>Publi Artigos de Vestuário, Moda Masculina e Feminina.</description>${result}</channel>
   </rss>

  `;


  res.setHeader("Content-Type", "text/xml");
  res.write(content);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

