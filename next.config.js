/** @type {import('next').NextConfig} */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dominios = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/config/dominiosImagens.json"), "utf-8").replace(/^\uFEFF/, "") // remove bom
);


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




