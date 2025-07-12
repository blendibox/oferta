import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';


// Função para gerar slug
function gerarSlug(texto, id) {
  return texto
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-") + '-' + id;
}


const pastaXML = path.join(process.cwd(), 'data', 'awin');
const pastaSaida = path.join(process.cwd(), 'public', 'data');
const pastaSaida2 = path.join(process.cwd(), 'data', 'awin');

if (!fs.existsSync(pastaSaida)) {
  fs.mkdirSync(pastaSaida, { recursive: true });
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

    console.log(`🔄 Convertendo ${arquivo} → ${nomeBase}.json`);

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
		  produtos = json.cafProductFeed?.datafeed?.prod || [];
	  }
	  
      const arr = Array.isArray(produtos) ? produtos : [produtos];

     // Adiciona campo "slug"
      const produtosComSlug = produtos.map((p,i) => {
		  
		  
        const nome = p['g:title']  || (p['text']?p['text']['name']:"")  || p['title'] || (p['advertisername'] + ' use este cupom ') ;
        const id   = p['g:id']    || p['pId']   || i       ;
		
		const slug = gerarSlug(nome, id);
		
		slugIndex[slug] = `${nomeBase}.json`;
		
        return {
          ...p,
          slug: slug,
        };
      });

      fs.writeFileSync(caminhoJSON, JSON.stringify(produtosComSlug, null, 2), 'utf-8');
	  fs.writeFileSync(caminhoJSON2, JSON.stringify(produtosComSlug, null, 2), 'utf-8');
	  
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

	fs.writeFileSync(caminhoIndex, JSON.stringify(slugIndexFinal, null, 2), 'utf-8');


	console.log('📄 Índice atualizado em: public/slug-index.json');
}

converterTodosXMLs();
