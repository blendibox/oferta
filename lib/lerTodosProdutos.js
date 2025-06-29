import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Para simular __dirname no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function lerTodosProdutos() {
  const dataDir = path.join(process.cwd(), './data/');
  const arquivos = await fs.readdirSync(dataDir).filter(file => {
    const fullPath = path.join(dataDir, file);
    return fs.statSync(fullPath).isFile() && file.endsWith('.json');
  });

  let todos = [];

  for (const file of arquivos) {
    const conteudo = await fs.readFileSync(path.join(dataDir, file), 'utf8');
    try {
      const dados = JSON.parse(conteudo);
      todos = todos.concat(dados);
    } catch (err) {
      console.error(`Erro ao parsear ${file}:`, err);
    }
  }

  return todos;
}