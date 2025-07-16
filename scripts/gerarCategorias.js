import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

const dataDir = './out/data';

if (fs.existsSync(dataDir)) {
  const files = fs.readdirSync(dataDir);
  // continue processing files
} else {
  console.warn(`Directory ${dataDir} does not exist. Skipping...`);
  // Optionally, create the directory with fs.mkdirSync(dataDir, { recursive: true });
}

const pastaOrigem = path.join(process.cwd(), 'public', 'data');
const destino = path.join(process.cwd(), 'public', 'categorias.json');
const destinoData = path.join(process.cwd(), 'data', 'slugs', 'categorias.json');


const arquivos = fs.readdirSync(pastaOrigem).filter(file => file.endsWith('.json'));
const categorias = {};

function slug(str) {
  return slugify(str?.trim() || '', {
    lower: true,
    strict: true,
    locale: 'pt',
  });
}

for (const nomeArquivo of arquivos) {
  const caminho = path.join(pastaOrigem, nomeArquivo);
  const conteudo = JSON.parse(fs.readFileSync(caminho, 'utf-8'));

  for (const produto of conteudo) {
    const caminhoCategoria = produto?.cat?.mCat;
    if (!caminhoCategoria) continue;

    const partes = caminhoCategoria.split('>').map(s => s.trim());
    let atual = categorias;

    for (let i = 0; i < partes.length; i++) {
      const nome = partes[i];

      if (!atual[nome]) {
        atual[nome] = {
          slug: partes.slice(0, i + 1).map(slug).filter(Boolean).join('/'),
        };
      }

      // MODIFICAÇÃO: Adiciona o arquivo em todos os níveis!
      if (!atual[nome].arquivos) atual[nome].arquivos = new Set();
      atual[nome].arquivos.add(nomeArquivo);

      if (i < partes.length - 1) {
        if (!atual[nome].subcategorias) atual[nome].subcategorias = {};
        atual = atual[nome].subcategorias;
      }
    }
  }
}

// ⚠️ Convert Set → Array para salvar no JSON
function converterSets(obj) {
  for (const chave in obj) {
    if (obj[chave].arquivos) {
      obj[chave].arquivos = Array.from(obj[chave].arquivos);
    }
    if (obj[chave].subcategorias) {
      converterSets(obj[chave].subcategorias);
    }
  }
}
converterSets(categorias);

// 💾 Salvar o JSON final
fs.writeFileSync(destino, JSON.stringify(categorias, null, 2), 'utf-8');
fs.writeFileSync(destinoData, JSON.stringify(categorias, null, 2), 'utf-8');


console.log('✅ categorias.json gerado com sucesso em /public/categorias.json');
console.log('✅ categorias.json gerado com sucesso em /data/slugs/categorias.json');