import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { lerTodosProdutos } from "../lib/lerTodosProdutos.js";



// Em ESM, usamos isso para simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_PRODUTOS_POR_ARQUIVO = 10000;
const DIR_DESTINO = path.join(__dirname, "../public");

async function googleMerchant() {
  const produtos = await lerTodosProdutos();
  const total = produtos.length;

  let arquivosGerados = 0;

  for (let i = 0; i < total; i += MAX_PRODUTOS_POR_ARQUIVO) {
    const bloco = produtos.slice(i, i + MAX_PRODUTOS_POR_ARQUIVO);
    const xml = gerarXML(bloco);
    const fileName = `googleMerchant_${arquivosGerados + 1}.xml`;
    const filePath = path.join(DIR_DESTINO, fileName);

    fs.writeFileSync(filePath, xml, "utf-8");
    console.log(`✅ Feed salvo: ${fileName} (${bloco.length} produtos)`);
    arquivosGerados++;
  }
}

function gerarXML(produtos) {
  const items = produtos.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link><![CDATA[https://comprar.blendibox.com.br/produto/${post.slug}]]></link>
      <description><![CDATA[${post.title}]]></description>
      <g:image_link>${post.image}</g:image_link>
      <g:price><![CDATA[${post.price} BRL]]></g:price>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:id><![CDATA[${post.link.match(/\d{9,}/g)?.[0] || post.title.slice(0, 40)}]]></g:id>
      <g:brand><![CDATA[${post.brand || 'Sem marca'}]]></g:brand>
      <g:product_type><![CDATA[Maquiagem]]></g:product_type>
      <g:identifier_exists>FALSE</g:identifier_exists>
    </item>`).join("");

  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Blendibox - Dicas de Compras online</title>
  <link>https://comprar.blendibox.com.br</link>
  <description>Produtos divulgados por Blendibox, disponíveis para venda online por lojas parceiras.</description>
  ${items}
</channel>
</rss>`;
}

// executa se for chamado via CLI
googleMerchant();
