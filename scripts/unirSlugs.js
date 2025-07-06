// scripts/unirSlugs.js
import fs from 'fs';
import path from 'path';

const pasta = path.join(process.cwd(), 'data/slugs');
const destino = path.join(process.cwd(), 'data/slugs/slugs-unificado.json');

let slugsTotais = [];

fs.readdirSync(pasta).forEach(arquivo => {
  if (arquivo.endsWith('.json')) {
    const caminho = path.join(pasta, arquivo);
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    try {
      const json = JSON.parse(conteudo);
      slugsTotais = slugsTotais.concat(json);
    } catch (e) {
      console.error(`Erro ao ler ${arquivo}`, e);
    }
  }
});

fs.writeFileSync(destino, JSON.stringify(slugsTotais, null, 2));
console.log(`✅ Arquivo unificado salvo em ${destino} com ${slugsTotais.length} slugs.`);