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
	  }else{
		  produtos = json.cafProductFeed?.datafeed?.prod || [];
	  }
	  
      const arr = Array.isArray(produtos) ? produtos : [produtos];

     // Adiciona campo "slug"
      const produtosComSlug = produtos.map((p) => {
        const nome = p['g:title']  || p['text']['name'] ;
        const id   = p['g:id']     || p['pId']          ;
        return {
          ...p,
          slug: gerarSlug(nome, id),
        };
      });

      fs.writeFileSync(caminhoJSON, JSON.stringify(produtosComSlug, null, 2), 'utf-8');
	  fs.writeFileSync(caminhoJSON2, JSON.stringify(produtosComSlug, null, 2), 'utf-8');
	  
    } catch (err) {
      console.error(`❌ Erro ao processar ${arquivo}:`, err.message);
    }
  }

  console.log('✅ Conversão concluída!');
}

converterTodosXMLs();
