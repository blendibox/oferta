import fs from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), 'public', 'slug-index.json');

export function getSlugsFiltrados(callback) {
  const slugIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  return Object.entries(slugIndex)
    .filter(callback)
    .map(([slug]) => ({ slug }));
}

export function getSlugsPorArquivo(nomeArquivo) {
  return getSlugsFiltrados(([_, arquivo]) => arquivo === nomeArquivo);
}

export function getSlugsPorRegex(regex) {
  return getSlugsFiltrados(([_, arquivo]) => regex.test(arquivo));
}
