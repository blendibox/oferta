import fs from 'fs';
import path from 'path';
import Produto from '../../../components/produto';
import { notFound } from 'next/navigation';




function gerarSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD') // remove acentuação
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '') // remove caracteres especiais
    .replace(/\s+/g, '-')
	.trim()
}


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
//console.log('Exemplo de produto:', todos[0]);
  return todos;
}

export async function generateStaticParams() {
  const todos = await lerTodosProdutos();
  return todos.map(p => ({
    title: gerarSlug(String(p.title)),
  }));
}

export default async function Page({ params }) {
  const { title } = params;
  const todos = await lerTodosProdutos();
  console.log(title);
  const produto = todos.find(p => gerarSlug(p.title) === title);

  if (!produto) return notFound();

  return (
    <main>
      <Produto
        title={produto.title}
        image={produto.image}
        link={produto.link}
        price={produto.price}
        imageWidth={300}
        imageHeight={450}
        offer={produto.offer}
        priceGoogle={produto.priceGoogle}
      />
    </main>
  );
}
