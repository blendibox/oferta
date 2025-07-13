/** @type {import('next').NextConfig} */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dominios = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/config/dominiosImagens.json"), "utf-8").replace(/^\uFEFF/, "") // remove bom
);

dominios.push('images2.productserve.com'); // padrão awin
dominios.push('cdn.shopify.com'); //usado por awin GALVIC
dominios.push('stanley.fbitsstatic.net'); //usado por awin STANLEY
dominios.push('res.cloudinary.com/beleza-na-web');  //usado por awin OBOTICARIO E BELEZANAWEB
dominios.push('kipling.vteximg.com.br'); //usado por awin KIPPLING 
dominios.push('imgnike-a.akamaihd.net'); //usado por awin NIKE 
dominios.push('mizunobr.vteximg.com.br'); //usado por awin MIZUNO 




const nextConfig = {
	output: 'export',
    reactStrictMode: true,
    images: { remotePatterns: dominios.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
	 unoptimized: true,
   },
   turbopack: {
      resolveExtensions: [ '.ts', '.jsx', '.js',  '.json','mjs', 'cjs'],
   },
   webpack: (config) => {
      config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
      return config;
   },

}

export default nextConfig;




