import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { lerTodosProdutos } from "../lib/lerTodosProdutos.js";
import { lerTodasMarcas } from "../lib/lerTodasMarcas.js";


// Utilitário para tratar preço em diferentes formatos
function extrairPreco(valor) {
  if (!valor) return '0';
  if (typeof valor === 'object' && valor.$) return valor.$;
  if (typeof valor === 'number') return valor.toString();
  return valor;
}


// Em ESM, usamos isso para simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_PRODUTOS_POR_ARQUIVO = 10000;
const DIR_DESTINO = path.join(__dirname, "../public");

async function googleMerchant() {
  const produtos = await lerTodosProdutos();
  const total = produtos.length;
  const marcas = await lerTodasMarcas();
  const totalMarcas = marcas.length;
  

  let arquivosGerados = 0;


  // gerar de marcas
  
   for (let i = 0; i < totalMarcas; i += MAX_PRODUTOS_POR_ARQUIVO) {
    const blocom = marcas.slice(i, i + MAX_PRODUTOS_POR_ARQUIVO);
	const normalizados = blocom.map((p) => {
				// Galvic: detecta se é o formato com "g:title"
				const isGalvic = !!p['g:title'];
				
				const precoBruto = isGalvic
				  ? extrairPreco(p['g:price'])
				  : extrairPreco(p?.price?.buynow);
			  
			    const categoriaTexto = isGalvic
				  ? '' // ou p['g:categoria'] se existir
				  : (p?.cat?.mCat || '').toLowerCase();

				const padronizado = {
					title: isGalvic ? p['g:title'] : p?.text?.name || '',
					price: parseFloat(
						precoBruto.replace(/[^\d,.-]/g, '').replace(',', '.')
					  ),
					imagem: isGalvic ? p['g:image_link'] : p?.uri?.mImage,
					slug: p.slug || '',
					link: isGalvic ? p['link'] || p['aw_deep_link'] : p?.uri?.mLink || p?.uri?.awTrack,
					brand: isGalvic ? p['g:brand'] : '',
					origem: '',
					categoria: categoriaTexto
				  };

				return { _p: padronizado };
		   })
	

    const xmlm = gerarXML(normalizados);
    const fileNamem = `googleMerchant_${arquivosGerados + 1}.xml`;
    const filePathm = path.join(DIR_DESTINO, fileNamem);

    fs.writeFileSync(filePathm, xmlm, "utf-8");
    console.log(`✅ Feed salvo: ${fileNamem} (${blocom.length} produtos)`);
    arquivosGerados++;
  }// end for
  
  
  // gerar de produtos
  
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
	console.log(produtos);

  const items = produtos.map((post) => `
    <item>
      <title><![CDATA[${post.title || post._p.title }]]></title>
      <link><![CDATA[https://comprar.blendibox.com.br/produto/${post.slug || post._p.slug}]]></link>
      <description><![CDATA[${post.title || post._p.title}]]></description>
      <g:image_link>${post.image}</g:image_link>
      <g:price><![CDATA[${post.price || post._p && post._p.price} BRL]]></g:price>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:id><![CDATA[${post.link && post.link.match(/\d{9,}/g)?.[0] ||  post.title && post.title.slice(0, 40) || post._p.title.slice(0, 40)}]]></g:id>
      <g:brand><![CDATA[${post.brand || post._p && post._p.brand || 'Sem marca'}]]></g:brand>
      <g:product_type><![CDATA[${post.categoria ||  post._p && post._p.categoria || 'Bolsas e Malas'}]]></g:product_type>
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
