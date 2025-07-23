import fs from 'fs';
import path from 'path';

const entradaDir = path.join('data', 'slugs');
const saidaDir = path.join('data', 'slugs-lotes');
const tamanhoLote = 10000;

process.env.COUNTER=1;

fs.mkdirSync(saidaDir, { recursive: true });


function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Limpa diretório saidaDir
if (fs.existsSync(saidaDir)) {
  console.log(`🧹 Limpando diretório final: ${saidaDir}`);
  fs.rmSync(saidaDir, { recursive: true, force: true });
}
fs.mkdirSync(saidaDir);


const arquivos = fs.readdirSync(entradaDir).filter(f => f.startsWith('slugs_') && f.endsWith('.json'));

for (const arquivo of arquivos) {
  const marca = arquivo.replace(/^slugs_/, '').replace(/\.json$/, '');


  if(isNumeric(marca)){
	  //console.log('marca: ' + marca);
	  continue;
  }
  
  const fullPath = path.join(entradaDir, arquivo);
const origem = arquivo;
  const slugsMap = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  const slugs = Object.entries(slugsMap); // [[slug, origem], [slug, origem], ...]

  const totalLotes = Math.ceil(slugs.length / tamanhoLote);

  for (let i = 0; i < totalLotes; i++) {
    const fatia = slugs.slice(i * tamanhoLote, (i + 1) * tamanhoLote);

    const nomeSaida = `slugs_${marca}_${process.env.COUNTER}.jsonl`; // JSONL = 1 linha por objeto
    const caminhoSaida = path.join(saidaDir, nomeSaida);

    const stream = fs.createWriteStream(caminhoSaida);

    fatia.forEach(([idx,value]) => {
      stream.write(JSON.stringify({ slug:value.slug, origem:origem }) + '\n');
    });

    stream.end();
	
	process.env.COUNTER++;
	
    console.log(`✅ Criado: ${nomeSaida} (${fatia.length} slugs)`);
   }
}