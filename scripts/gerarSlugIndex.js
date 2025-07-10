import fs from 'fs';
import path from 'path';

// Pasta com seus arquivos JSON

const dataDir = path.join(process.cwd(), 'data/');
const outputPath = path.join(process.cwd(), 'data/slugs/slug-index.json');
const publicPath = path.join(process.cwd(), 'public/slug-index.json');

const slugIndex = {};

const arquivos = fs.readdirSync(dataDir).filter(file =>
  fs.statSync(path.join(dataDir, file)).isFile() && file.endsWith('.json')
);

for (const file of arquivos) {
  const fullPath = path.join(dataDir, file);
  try {
    const conteudo = fs.readFileSync(fullPath, 'utf8');
    const produtos = JSON.parse(conteudo);

    for (const produto of produtos) {
      const slug = produto.slug;
      if (slug) slugIndex[slug] = file;
    }
  } catch (err) {
    console.error(`Erro ao processar ${file}:`, err);
  }
}

fs.writeFileSync(outputPath, JSON.stringify(slugIndex, null, 2), 'utf8');
fs.writeFileSync(publicPath, JSON.stringify(slugIndex, null, 2), 'utf8');
console.log(`✅ Índice de slugs gerado com sucesso em: ${outputPath} e em ${publicPath} `);
