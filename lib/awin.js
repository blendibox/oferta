import fs from 'fs';
import path from 'path';

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