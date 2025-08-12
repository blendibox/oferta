import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import { decode } from 'html-entities';

 process.env.COUNTER = 1;

function gerarSlug(texto, id) {
  if (!texto || typeof texto !== 'string') texto = 'produto';

  return (
    texto
      .toLowerCase()
      .normalize("NFD")                    // Remove acentos
      .replace(/[\u0300-\u036f]/g, "")    // Remove marcas de acento
      .replace(/[^a-z0-9\s-]/g, "")       // Remove tudo que não for letra, número, espaço ou hífen
      .replace(/\s+/g, "-")               // Espaços viram hífen
      .replace(/-+/g, "-")                // Evita múltiplos hífens
      .replace(/^-|-$/g, "")              // Remove hífen no início/fim
    + '-' + id.toString().toLowerCase().replace(/[^a-z0-9]/g, "")
  );
}

const pastaXML = path.join(process.cwd(), 'data', 'awin');
const pastaSaida = path.join(process.cwd(), 'public', 'data');
const pastaSaida2 = path.join(process.cwd(), 'data', 'awin');

if (!fs.existsSync(pastaSaida)) {
  fs.mkdirSync(pastaSaida, { recursive: true });
}

if (!fs.existsSync(pastaSaida2)) {
  fs.mkdirSync(pastaSaida2, { recursive: true });
}

async function converterTodosXMLs() {
  const arquivos = fs.readdirSync(pastaXML).filter(file => file.endsWith('.xml'));

  if (arquivos.length === 0) {
    console.warn('Nenhum arquivo .xml encontrado em data/awin');
    return;
  }
  
   const slugIndex = {}; // ← Aqui armazenamos os slugs gerados

  for (const arquivo of arquivos) {
    const caminhoXML = path.join(pastaXML, arquivo);
    const nomeBase = path.basename(arquivo, '.xml');

	const caminhoJSON = path.join(pastaSaida, `${nomeBase}.json`);
	const caminhoJSON2 = path.join(pastaSaida2, `${nomeBase}.json`);

    console.log(`🔄 Convertendo ${arquivo} → ${nomeBase}.jsonl`);

    try {
      const xml = fs.readFileSync(caminhoXML, 'utf-8');
      const json = await parseStringPromise(xml, { explicitArray: false });

      let produtos = []
	  
	  if(nomeBase == 'GALVIC'){
		  produtos =  json.rss?.channel?.item || [];
	  }else if(nomeBase == 'CUPOM'){
            //ler cupons lomadee
	        produtos = json.coupons?.coupon || [];
	  }else if(nomeBase == 'PROMO'){
		   //ler cupons rakuten
		    produtos = json.couponfeed?.link|| [];
	  }else{
		  // Garante que datafeed seja sempre um array
			const datafeeds = Array.isArray(json.cafProductFeed?.datafeed)
			  ? json.cafProductFeed.datafeed
			  : [json.cafProductFeed?.datafeed].filter(Boolean); // Remove undefined/null se não existir

			// Agora junta os produtos de todos os datafeeds
			 produtos = datafeeds.flatMap((df) => df?.prod || []);
	  }
	  
      const arr = Array.isArray(produtos) ? produtos : [produtos];

     // Adiciona campo "slug"
      const produtosComSlug = produtos.map((p,i) => {
		  
		  
		const nome = decode(
		  p['g:title'] || p['text']?.['name'] || p['title'] || (p['advertisername'] + ' use este cupom ')
		);
		
		if (p['g:title']) p['g:title'] = decode(p['g:title']);
		if (p['g:description']) {
			//const desc = decode(p['g:description']);
			//p['g:description'] = desc.split('.')[0] + '.'; // pega até o primeiro ponto final
			p['g:description'] = 	'';// remove descricao
		}
		if (p['title']) p['title'] = decode(p['title']);
		if (p['text']) {
			if (p['text']['desc']) {
			  //const desc = decode(p['text']['desc']);
			  //p['text']['desc'] = desc.split('.')[0] + '.'; // corta no primeiro ponto final			  
			  p['text']['desc'] = 	'';// remove descricao
			}
			if (p['text']['name']) {
			  p['text']['name'] = decode(p['text']['name']);
			}
		}

		if (p['advertisername']) p['advertisername'] = decode(p['advertisername']);
		
        const id   = p['g:id']    || p['pId']   || i       ;
		
		const slug = gerarSlug(nome, id);
		
		slugIndex[slug] = `${nomeBase}.json`;
		
        return {
		  slug: slug,
          ...p,
          
        };
      });

          // x não precisa no build get staticparams
		  // v precisa  para pesquisa de produtos e reultado categorias	
		 		  
			// não salvar BELEZANAWEB, CEA e CENTAURO
             if(nomeBase!= 'BELEZANAWEB' 
			 && nomeBase!= 'CEA' 
			 && nomeBase!= 'CENTAURO'  
			 && nomeBase!= 'MOBLY'  
			 && nomeBase!= 'DAFITI'  
			 && nomeBase!= 'CLOVISCALCADOS'  		 
			 && nomeBase!= 'TELHANORTE'){					
		       fs.writeFileSync(caminhoJSON, JSON.stringify(produtosComSlug), 'utf-8'); // public/data	
			   console.log(`✅ Arquivo salvo: ${nomeBase}.json em public/data`);
			 }
			  
			  
		  // necessário para gerar slugs por marca	  
			fs.writeFileSync(caminhoJSON2, JSON.stringify(produtosComSlug), 'utf-8'); // data/awin
			 console.log(`✅ Arquivo salvo: ${nomeBase}.json em data/awin`); 
		
			 
	  
	  const jsonlContent = produtosComSlug.map(p => JSON.stringify(p)).join('\n');
	      // v precisa no build get staticparams
		  // x  não precisa para pesquisa de produtos e reultado categorias
	    //fs.writeFileSync(caminhoJSON.replace('.json', '.jsonl'), jsonlContent, 'utf-8');
		fs.writeFileSync(caminhoJSON2.replace('.json', '.jsonl'), jsonlContent, 'utf-8');
		
		const loteTamanho = 10000;
		const totalLotes = Math.ceil(produtosComSlug.length / loteTamanho);
		for (let i = 0; i < totalLotes; i++) {
		  const inicio = i * loteTamanho;
		  const fim = inicio + loteTamanho;
		  const lote = produtosComSlug.slice(inicio, fim);

		  const jsonlContent = lote.map(p => JSON.stringify(p)).join('\n');


		  const nomeArquivo =  path.join(process.cwd(), 'data', 'awin', `${nomeBase}_${process.env.COUNTER}.jsonl`); //jsonl
		  fs.writeFileSync(nomeArquivo, jsonlContent, 'utf-8');
		  console.log(`✅ Arquivo salvo: ${nomeArquivo} (${lote.length} registros)`);
		  
		  process.env.COUNTER++;
		  
		}
		
		//fs.writeFileSync(caminhoJSON2.replace('.json', '.jsonl'), jsonlContent, 'utf-8');
	  
    } catch (err) {
      console.error(`❌ Erro ao processar ${arquivo}:`, err.message);
    }
  }

  console.log('✅ Conversão concluída!');
  
   // Salva o índice de slugs
	const caminhoIndex = path.join(process.cwd(), 'public', 'slug-index.json');

	// 🟡 Carrega índice anterior (se existir)
	let slugIndexAnterior = {};
	if (fs.existsSync(caminhoIndex)) {
	  try {
		const data = fs.readFileSync(caminhoIndex, 'utf-8');
		slugIndexAnterior = JSON.parse(data);
	  } catch (e) {
		console.warn('⚠️ Não foi possível ler slug-index.json existente. Criando novo.');
	  }
	}

	// 🧠 Mescla os slugs antigos com os novos (os novos sobrescrevem, se houver conflito)
	const slugIndexFinal = { ...slugIndexAnterior, ...slugIndex };

	fs.writeFileSync(caminhoIndex, JSON.stringify(slugIndexFinal), 'utf-8');


	console.log('📄 Índice atualizado em: public/slug-index.json');
}






converterTodosXMLs();
