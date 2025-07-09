import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

export async function lerProdutosXML() {
  const filePath = path.join(process.cwd(), 'data/awin/GALVIC.xml');
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
