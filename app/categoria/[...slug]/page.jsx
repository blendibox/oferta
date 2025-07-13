
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const categoriasPath = path.join(process.cwd(), 'public', 'categorias.json');
  const categoriasJson = JSON.parse(fs.readFileSync(categoriasPath, 'utf-8'));

  const slugs = [];

  function coletar(categorias) {
    for (const [_, dados] of Object.entries(categorias)) {
      slugs.push({ slug: dados.slug.split('/') });
      if (dados.subcategorias) {
        coletar(dados.subcategorias);
      }
    }
  }

  coletar(categoriasJson);
  return slugs;
}

export default function CategoriaPage() {
  // o layout + ResultadosFiltrados vai cuidar do resto
  return null;
}
