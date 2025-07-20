import fs from 'fs';
import path from 'path';
import readline from 'readline';

/**
 * Lê produtos a partir de um arquivo JSON gerado a partir de XML.
 * Este é o novo padrão para arquivos como: data/awin/mizuno.json
 */
export async function lerProdutosJSON(fileJson) {
  const filePath = path.join(process.cwd(), 'data', 'awin', `${fileJson}.json`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo JSON não encontrado: ${filePath}`);
    return [];
  }

  const raw = fs.readFileSync(filePath, 'utf-8');

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [data];
  } catch (err) {
    console.error(`❌ Erro ao parsear JSON de ${filePath}:`, err.message);
    return [];
  }
}



export async function lerProdutoPorSlug(slug, nomeArquivoJsonl) {
  const filePath = path.join(process.cwd(), 'data', 'awin', `${nomeArquivoJsonl}.jsonl`);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${filePath}`);
    return null;
  }

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const produto = JSON.parse(line);
      if (produto.slug === slug) {
        rl.close(); // encerra a leitura ao encontrar
        return produto;
      }
    } catch (err) {
      console.error(`❌ Erro ao parsear linha JSONL:`, err.message);
    }
  }

  return null; // se não encontrar
}

/**
 * Alias para compatibilidade com XML Google Shopping
 * (mesma estrutura dos arquivos convertidos)
 */
export async function lerProdutosXMLGoogle(fileJson) {
  return await lerProdutosJSON(fileJson);
}




export async function lerProdutosXML(fileXml) {
  
  const url = 'data/awin/'+ fileXml +'.xml';
  const filePath = path.join(process.cwd(), String(url));

  const xml = fs.readFileSync(filePath, 'utf-8');
  const parsed = await parseStringPromise(xml, { explicitArray: false });

  const items = parsed.cafProductFeed.datafeed.prod || [];
  return Array.isArray(items) ? items : [items];
}

/*

export async function lerProdutosXMLGoogle(fileXml) {
  
  const url = 'data/awin/'+ fileXml +'.xml';
  const filePath = path.join(process.cwd(), String(url));

  const xml = fs.readFileSync(filePath, 'utf-8');
  const parsed = await parseStringPromise(xml, { explicitArray: false });

  const items = parsed.rss.channel.item || [];
  return Array.isArray(items) ? items : [items];
}

*/