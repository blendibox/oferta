import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

const tipo = process.argv[2];
if (!tipo) {
  console.error('❌ Você deve informar o tipo. Ex: node scripts/mesclarOutros.js produto');
  process.exit(1);
}



const regex = new RegExp(`^out-${tipo}-lote-\\d+$`);
//const regex = new RegExp(`^out-[^-]+-lote-\d+$`);

const diretorioFinal = path.join(process.cwd(), 'out');
const diretoriosLote = fs
  .readdirSync(process.cwd())
  .filter(dir => regex.test(dir))
  .map(dir => path.join(process.cwd(), dir));
/*
// Limpa diretório final /out
if (fs.existsSync(diretorioFinal)) {
  console.log('🧹 Limpando diretório final: /out');
  fs.rmSync(diretorioFinal, { recursive: true, force: true });
}
fs.mkdirSync(diretorioFinal);
*/
// Copia tudo da pasta public para out
const publicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  fse.copySync(publicDir, diretorioFinal, {
    overwrite: true,
    dereference: true,
    errorOnExist: false
  });
  console.log(`📦 Copiado conteúdo de public para /out`);
}

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

/*

const saidaDir2 = path.join('data', 'slugs-lotes');

// Limpa diretório saidaDir
if (fs.existsSync(saidaDir2)) {
  console.log(`🧹 Limpando diretório final: ${saidaDir2}`);
  fs.rmSync(saidaDir2, { recursive: true, force: true });
}
fs.mkdirSync(saidaDir2);
*/
console.log('🎉 Todos os lotes foram unificados em /out com sucesso!');