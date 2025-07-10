import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

export async function lerProdutosXML(fileXml) {
  
  const url = 'data/awin/'+ fileXml +'.xml';
  const filePath = path.join(process.cwd(), String(url));

  const xml = fs.readFileSync(filePath, 'utf-8');
  const parsed = await parseStringPromise(xml, { explicitArray: false });

  const items = parsed.cafProductFeed.datafeed.prod || [];
  return Array.isArray(items) ? items : [items];
}



export async function lerProdutosXMLGoogle(fileXml) {
  
  const url = 'data/awin/'+ fileXml +'.xml';
  const filePath = path.join(process.cwd(), String(url));

  const xml = fs.readFileSync(filePath, 'utf-8');
  const parsed = await parseStringPromise(xml, { explicitArray: false });

  const items = parsed.rss.channel.item || [];
  return Array.isArray(items) ? items : [items];
}

export function gerarSlug(texto, id) {
  return texto
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^\w\s-]/g, "") // remove caracteres especiais
    .replace(/\s+/g, "-") + '-' + id;
}
