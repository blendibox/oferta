import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Para simular __dirname no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function lerTodasMarcas() {
  const dataDir = path.join(process.cwd(), './data/awin/');
  const arquivos = await fs.readdirSync(dataDir).filter(file => {
    const fullPath = path.join(dataDir, file);
    return fs.statSync(fullPath).isFile() && file.endsWith('.json');
  });

  let todos = [];

  for (const file of arquivos) {
	  
	let brand =  file.replace(/^slugs_/, '').replace(/.json/, '').toLowerCase();  
    const conteudo = await fs.readFileSync(path.join(dataDir, file), 'utf8');	
    try {
      const dados = JSON.parse(conteudo);
	  
	    // 🔄 Garante que é array
		if (!Array.isArray(dados)) {
		  console.warn(`⚠️ O arquivo ${file} não é um array de objetos`);
		  dados = [dados];
		}

		// ✏️ Atualiza/adiciona o campo brand em cada item
		const dadosComBrand = dados.map(item => ({
		  ...item,
		  brand: brand
		}));
		//console.log(dadosComBrand[0]);
      todos = todos.concat(dadosComBrand);
    } catch (err) {
      console.error(`Erro ao parsear ${file}:`, err);
    }
  }

  return todos;
}