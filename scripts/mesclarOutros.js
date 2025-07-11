// scripts/mesclarOutros.js
import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

const tipo = process.argv[2]; // "produto", "mizuno", etc.

if (!tipo) {
  console.error('❌ Você deve informar o tipo. Ex: node scripts/mesclarOutros.js produto');
  process.exit(1);
}

const regex = new RegExp(`^out-${tipo}-lote-\\d+$`);

const diretorioFinal = path.join(process.cwd(), 'out');
const diretoriosLote = fs
  .readdirSync(process.cwd())
  .filter(dir => regex.test(dir))
 // .filter(dir => /^out-[a-z0-9]+-lote-\d+$/i.test(dir)) // contempla todas iniciando com out-xxx-lote-xx
  .map(dir => path.join(process.cwd(), dir));

// Garante que a pasta final esteja limpa
if (fs.existsSync(diretorioFinal)) {
  console.log('🧹 Limpando diretório final: /out');
  fs.rmSync(diretorioFinal, { recursive: true, force: true });
}
fs.mkdirSync(diretorioFinal);

console.log(`📦 Mesclando ${diretoriosLote.length} lotes para /out...`);

for (const dir of diretoriosLote) {
  fse.copySync(dir, diretorioFinal, {
    overwrite: true,
    dereference: true,
    errorOnExist: false
  });
  console.log(`✅ Copiado: ${dir}`);
  
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`🗑️  Apagado: ${dir}`);
}

console.log('🎉 Todos os lotes foram unificados em /out com sucesso!');
