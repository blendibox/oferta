import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ajuste para seu domínio real:
const BASE_URL = 'https://comprar.blendibox.com.br';
const OUT_DIR = path.join(__dirname, '..', 'out');
const SITEMAP_SIZE = 10000;

// Função que varre todos os arquivos .html recursivamente
function* walkHtmlFiles(dir, base = '') {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.join(base, file);
    if (fs.statSync(fullPath).isDirectory()) {
      yield* walkHtmlFiles(fullPath, relPath);
    } else if (file.endsWith('.html')) {
      // Gera URL removendo '.html' do final
      let url = '/' + relPath.replace(/\\/g, '/');
      url = url.replace(/\.html$/, '');
      yield url;
    }
  }
}

(async () => {
  let batch = [];
  let sitemapFiles = [];
  let sitemapIndex = 0;

  const urls = walkHtmlFiles(OUT_DIR);

  for (const url of urls) {
    batch.push(url);
    if (batch.length >= SITEMAP_SIZE) {
      const smStream = new SitemapStream({ hostname: BASE_URL });
      batch.forEach(u => smStream.write({ url: u, changefreq: 'weekly', priority: 0.7 }));
      smStream.end();
      const sitemap = await streamToPromise(smStream).then(sm => sm.toString());
      const filename = `sitemap-${sitemapIndex}.xml`;
      fs.writeFileSync(path.join(OUT_DIR, filename), sitemap);
      sitemapFiles.push(filename);
      sitemapIndex++;
      batch = [];
    }
  }
  // Grava o último lote, se houver
  if (batch.length) {
    const smStream = new SitemapStream({ hostname: BASE_URL });
    batch.forEach(u => smStream.write({ url: u, changefreq: 'weekly', priority: 0.7 }));
    smStream.end();
    const sitemap = await streamToPromise(smStream).then(sm => sm.toString());
    const filename = `sitemap-${sitemapIndex}.xml`;
    fs.writeFileSync(path.join(OUT_DIR, filename), sitemap);
    sitemapFiles.push(filename);
  }

  // Gera o sitemap-index.xml
  let sitemapIndexXml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  sitemapFiles.forEach(filename => {
    sitemapIndexXml += `  <sitemap><loc>${BASE_URL}/${filename}</loc></sitemap>\n`;
  });
  sitemapIndexXml += '</sitemapindex>';
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemapIndexXml);

  console.log(`Gerados ${sitemapFiles.length} arquivos sitemap + sitemap.xml`);
})();