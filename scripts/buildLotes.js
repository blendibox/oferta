// scripts/buildLotes.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Caminho onde estão os arquivos slugs_*.json
const pastaSlugs = path.join(process.cwd(), 'data', 'slugs');

// Encontra todos os arquivos com o padrão "slugs_*.json"
const arquivos = fs
  .readdirSync(pastaSlugs)
  .filter(name => /^slugs_\d+\.json$/.test(name))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/));
    const numB = parseInt(b.match(/\d+/));
    return numA - numB;
  });

console.log(`🔍 Encontrados ${arquivos.length} arquivos de slugs.`);

// Gera um build para cada arquivo
for (const arquivo of arquivos) {
  const numero = arquivo.match(/\d+/)[0];
  const env = `LOTE=${numero}`;
  const outDir = `out-lote-${numero}`;

  console.log(`🚀 Gerando build do lote ${numero} → ${outDir}`);
  execSync(`cross-env ${env} next build `, { stdio: 'inherit' });
  // copia a pasta out
  fs.cpSync('out', outDir, { recursive: true });
}

console.log('✅ Todos os lotes foram processados com sucesso!');