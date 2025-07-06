// scripts/mesclarOutros.js
import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

const diretorioFinal = path.join(process.cwd(), 'out');
const diretoriosLote = fs
  .readdirSync(process.cwd())
  .filter(dir => /^out-lote-\d+$/.test(dir)) // Ex: out-lote-1, out-lote-2
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
