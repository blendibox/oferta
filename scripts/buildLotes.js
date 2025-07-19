import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const tipo = process.argv[2];
if (!tipo) {
  console.error('❌ Você deve informar o tipo do BUILD_TARGET. Ex: node buildLotes.js produto');
  process.exit(1);
}

const pastaSlugs = path.join(process.cwd(), 'data', 'slugs');

function copiaSomenteTarget(outDir, target) {
  const origem = path.join('out', target);
  const destino = path.join(outDir, target);

  if (!fs.existsSync(origem)) {
    console.warn(`⚠️ Pasta não encontrada: ${origem}`);
    return;
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.cpSync(origem, destino, { recursive: true });
}

if (tipo == 'produto') {
  const arquivos = fs
    .readdirSync(pastaSlugs)
    .filter(name => /^slugs_\d+\.json$/.test(name))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/));
      const numB = parseInt(b.match(/\d+/));
      return numA - numB;
    });

  console.log(`🔍 Tipo: ${tipo} | ${arquivos.length} arquivos de slugs encontrados.`);

  for (const arquivo of arquivos) {
    const numero = arquivo.match(/\d+/)[0];
    const envVars = `LOTE=${numero} BUILD_TARGET=${tipo}`;
    const outDir = `out-${tipo}-lote-${numero}`;

    console.log(`🚀 Gerando build do lote ${numero} → ${outDir}`);
    execSync(`cross-env ${envVars} next build`, { stdio: 'inherit' });

    copiaSomenteTarget(outDir, tipo);
  }
} else if (tipo === 'categoria') {
  const categoriasPath = path.join(process.cwd(), 'public', 'categorias.json');
  const categoriasJson = JSON.parse(fs.readFileSync(categoriasPath, 'utf-8'));

  const slugs = [];
  function coletar(categorias) {
    for (const [_, dados] of Object.entries(categorias)) {
      if (dados?.slug) slugs.push(dados.slug);
      if (dados.subcategorias) coletar(dados.subcategorias);
    }
  }
  coletar(categoriasJson);

  const tamanhoLote = 15000;
  const totalLotes = Math.ceil(slugs.length / tamanhoLote);

  console.log(`🔍 Tipo: ${tipo} | ${slugs.length} categorias | ${totalLotes} lotes`);

  for (let i = 0; i < totalLotes; i++) {
    const numero = i + 1;
    const envVars = `LOTE=${numero} BUILD_TARGET=categoria`;
    const outDir = `out-categoria-lote-${numero}`;

    console.log(`🚀 Gerando build do lote ${numero} → ${outDir}`);
    execSync(`cross-env ${envVars} next build`, { stdio: 'inherit' });

    copiaSomenteTarget(outDir, tipo);
  }
} else {
	//  promo, cupom , galvic e  nike...,
	const jsonPath = path.join(process.cwd(), 'data', 'awin', `${tipo.toUpperCase()}.json`);
	if (!fs.existsSync(jsonPath)) {
	  console.error(`❌ Arquivo JSON não encontrado: ${jsonPath}`);
	  process.exit(1);
	}
	const parsed = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
	//console.log(parsed[0]);

  const  produtos = parsed || [];


  const todos = Array.isArray(produtos) ? produtos : [produtos];
  const tamanhoLote = 10000;
  const totalLotes = Math.ceil(todos.length / tamanhoLote);

  console.log(`🔍 Tipo: ${tipo} | ${todos.length} produtos | ${totalLotes} lotes de ${tamanhoLote}`);

  for (let i = 0; i < totalLotes; i++) {
    const numero = i + 1;
    const envVars = `LOTE=${numero} BUILD_TARGET=${tipo}`;
    const outDir = `out-${tipo}-lote-${numero}`;

    console.log(`🚀 Gerando build do lote ${numero} → ${outDir}`);
    execSync(`cross-env ${envVars} next build`, { stdio: 'inherit' });

    copiaSomenteTarget(outDir, tipo);
  }
}

console.log('✅ Todos os lotes foram processados com sucesso!');