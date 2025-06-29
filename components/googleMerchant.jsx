// lib/feed.ts


// Função utilitária para ler todos os JSONs
async function lerTodosProdutos() {
  const dataDir = path.join(process.cwd(), './data/'); 
  const arquivos = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

  let todos = [];

  for (const file of arquivos) {
    const conteudo = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const dados = JSON.parse(conteudo);
    todos = todos.concat(dados);
  }
console.log('Exemplo de produto:', todos[0]);
  return todos;
}




export const googleMerchant = async () => {
  // This contains site level metadata like title, url, etc
  

var produtos  = '';
var result ='';

var count = 0;


const product = await lerTodosProdutos();



var produtos =   product.map((post,i) => 
  `<item><title><![CDATA[ ${post.title}]]></title><link><![CDATA[${post.link}]]></link><description><![CDATA[${post.title}]]></description>`+
  `<g:image_link>${post.image}</g:image_link><g:price><![CDATA[${post.price}]]></g:price><g:condition>new</g:condition>` +
  `<g:availability>in stock </g:availability><g:id><![CDATA[${post.link.match(/\d{9,9}/g)}]]></g:id><g:item_group_id><![CDATA[]]>></g:item_group_id><g:installment><g:months>3</g:months>` +
  `<g:amount><![CDATA[${post.price} BRL]]></g:amount></g:installment><g:brand><![CDATA[${post.brand}]]></g:brand><g:product_type><![CDATA[Maquiagem ]]></g:product_type> ` +
  `<g:identifier_exists>FALSE</g:identifier_exists><g:online_only>y</g:online_only>` +
  `</item>`

  );



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

  return content;
};





