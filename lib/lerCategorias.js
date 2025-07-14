import fs from 'fs';
import path from 'path';

export function lerCategoriasJson() {
  const categoriasPath = path.join(process.cwd(), 'public', 'categorias.json');
  return JSON.parse(fs.readFileSync(categoriasPath, 'utf-8'));
}