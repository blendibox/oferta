// scripts/buildLotes.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';


const tipo = process.argv[2]; // ← tipo como argumento, ex: "produto", "mizuno"
if (!tipo) {
  console.error('❌ Você deve informar o tipo do BUILD_TARGET. Ex: node buildLotes.js produto');
  process.exit(1);
}

// Caminho onde estão os arquivos slugs_*.json
const pastaSlugs = path.join(process.cwd(), 'data', 'slugs');


if ( tipo == 'produto'){
	// Encontra todos os arquivos com o padrão "slugs_*.json"
	const arquivos = fs
	  .readdirSync(pastaSlugs)
	  .filter(name => /^slugs_\d+\.json$/.test(name))
	  .sort((a, b) => {
		const numA = parseInt(a.match(/\d+/));
		const numB = parseInt(b.match(/\d+/));
		return numA - numB;
	  });

	console.log(`🔍 Tipo: ${tipo} | ${arquivos.length} arquivos de slugs encontrados.`);

	// Gera um build para cada arquivo
	for (const arquivo of arquivos) {
	  const numero = arquivo.match(/\d+/)[0];
	  const envVars = `LOTE=${numero} BUILD_TARGET=${tipo}`;
	  const outDir = `out-${tipo}-lote-${numero}`;

	  console.log(`🚀 Gerando build do lote ${numero} → ${outDir}`);
	  execSync(`cross-env ${envVars} next build `, { stdio: 'inherit' });
	  // copia a pasta out
	  fs.cpSync('out', outDir, { recursive: true });
	}
}else if (tipo === 'categoria') {
  // Lê e processa categorias.json
  const categoriasPath = path.join(process.cwd(), 'public', 'categorias.json');
  const categoriasJson = JSON.parse(fs.readFileSync(categoriasPath, 'utf-8'));

  const slugs = [];

  function coletar(categorias) {
    for (const [_, dados] of Object.entries(categorias)) {
      if (dados?.slug) {
        slugs.push(dados.slug);
      }
      if (dados.subcategorias) {
        coletar(dados.subcategorias);
      }
    }
  }

  coletar(categoriasJson);

  const tamanhoLote = 300;
  const totalLotes = Math.ceil(slugs.length / tamanhoLote);

  console.log(`🔍 Tipo: ${tipo} | ${slugs.length} categorias | ${totalLotes} lotes`);

  for (let i = 0; i < totalLotes; i++) {
    const numero = i + 1;
    const envVars = `LOTE=${numero} BUILD_TARGET=categoria`;
    const outDir = `out-categoria-lote-${numero}`;

    console.log(`🚀 Gerando build do lote ${numero} → ${outDir}`);
    execSync(`cross-env ${envVars} next build`, { stdio: 'inherit' });
    fs.cpSync('out', outDir, { recursive: true });
  }
	
}else{
	// 🔄 Leitura dinâmica do XML da marca atual (ex: mizuno)

	  const xmlPath = path.join(process.cwd(), 'data', 'awin', `${tipo.toUpperCase()}.xml`);
	  if (!fs.existsSync(xmlPath)) {
		console.error(`❌ Arquivo XML não encontrado: ${xmlPath}`);
		process.exit(1);
	  }
	 

	  const xmlData = fs.readFileSync(xmlPath, 'utf8');
	  const { parseStringPromise } = await import('xml2js');
	  const parsed = await parseStringPromise(xmlData, { explicitArray: false });
	  
	

      let produtos = [];
      // xml com formatos diferentes
	  if(tipo == 'galvic'){ 
	       //lerProdutosXMLGoogle
		    produtos = parsed.rss?.channel?.item || [];
	  }else if(tipo == 'cupom'){
            //ler cupons lomadee
	        produtos = parsed.coupons?.coupon || [];
	  }else if(tipo == 'promo'){
		   //ler cupons rakuten
		    produtos = parsed.couponfeed?.link || [];
	  }else{
		   //lerProdutosXML
		    produtos = parsed.cafProductFeed.datafeed.prod || []; 
	  }
	 
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

		fs.cpSync('out', outDir, { recursive: true });
	  }
	
}

/*
<!--ELEMENT prod (
        brand?,cat?,price?,text?,uri?,vertical?,
        pId,
        avgRating?,awLastUpdated?,colour?,comGroup?,cond?,
        custom1?,custom2?,custom3?,custom4?,custom5?,custom6?,custom7?,custom8?,custom9?,
        delRestrictions?,delTime?,dimensions?,ean?,isbn?,lastUpdated?,modelNumber?,mpn?,
        numberAvailable?,numStars?,parentId?,productGTIN?,productModel?,proType?,rating?,
        reviews?,sizeStockAmount?,sizeStockStatus?,stockStatus?,termsOfContract?,
        upc?,valFrom?,valTo?,weight?,namedField*)
    -->
*/


console.log('✅ Todos os lotes foram processados com sucesso!');