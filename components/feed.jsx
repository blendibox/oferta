// lib/feed.ts
import { Feed } from "feed";


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



export const buildFeed = async () => {
	// This contains site level metadata like title, url, etc
  const feed = new Feed( {
      title: 'Blendibox',
      link: process.env.NEXT_PUBLIC_DOMAIN_URL,
      description: 'Blendibox - Compre as melhores ofertas da internet',

   });

   // feed._declaration._attributes.push({"xmlns:g" : "http://base.google.com/ns/1.0"});

    // feed.rss.push({attributes: {"xmlns:g": "http://base.google.com/ns/1.0"}});

  const posts = await lerTodosProdutos();
  posts.forEach((post) => {
    feed.addItem({
       title: post.title,
       link:  post.link '&utm_source=Site&utm_medium=GoogleMerchant&utm_campaign=GoogleMerchant',
       description: post.title,
       date: '',
      
      content: '<g:image_link>'+post.image+'</g:image_link><g:price>' + post.price + '</g:price>',
     

    });
  });

  return feed;
};