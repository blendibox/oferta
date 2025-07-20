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

  const tamanhoLote = 10000;
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
    // marcas promo, cupom 
    const marca = tipo;
    const pastaLotes = path.join('data', 'slugs-lotes');
	
    const arquivosLotes = fs
     .readdirSync(pastaLotes)
     .filter((f) => f.startsWith(`slugs_${marca}_`) && f.endsWith('.jsonl'));

	if (arquivosLotes.length === 0) {
	  console.warn(`⚠️ Nenhum arquivo de lote encontrado para a marca "${marca}" em ${pastaLotes}`);
	  process.exit(0);
	}

    let index = 0;
	for (const arquivo of arquivosLotes) {		
	 	
	  const src = path.join(pastaLotes, arquivo);
	  const outDir = `out-${marca}-lote-${index}`;
      const envVars = `LOTE=${index} BUILD_TARGET=${marca.toLowerCase()} SLUGS_FILE=slugs_${marca}_${index}.jsonl`;
	  

	  // Executa build passando a marca como variável de ambiente (se quiser usar em generateStaticParams)
	  console.log(`🚀 Gerando build do lote ${index} → ${outDir}`);
	  execSync(`cross-env ${envVars} next build`, { stdio: 'inherit' });
	  
	  // Copiar apenas o diretório relevante para o lote
      copiaSomenteTarget(outDir, tipo);


	  console.log(`✅ Finalizado: ${arquivo}`);
	  
	  index  = index + 1;  
	} 
  

}



console.log('✅ Todos os lotes foram processados com sucesso!');