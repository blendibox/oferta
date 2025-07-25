import fs from 'fs';
import path from 'path';

// Diretórios
const dataDirs = [
  path.join(process.cwd(), 'data'),
  path.join(process.cwd(), 'data','awin')
];


const slugOfertasFolder =  path.join(process.cwd(), 'data','slugs-ofertas');
fs.mkdirSync(slugOfertasFolder, { recursive: true }); // cria a pasta caso não exista

const slugAwinFolder =  path.join(process.cwd(), 'data','slugs');
fs.mkdirSync(slugAwinFolder, { recursive: true }); // cria a pasta caso não exista



const outputPath = path.join(process.cwd(), 'data/slugs/slug-index.json');
const publicPath = path.join(process.cwd(), 'public/slug-index.json');
const publicOutputPath = path.join(process.cwd(), 'public/data/produtos/');

const slugIndex = {};

// Lê todos os arquivos .json de data/ e data/awin/
for (const dir of dataDirs) {
  const arquivos = fs.readdirSync(dir).filter(file =>
    fs.statSync(path.join(dir, file)).isFile() && file.endsWith('.json')
  );

  for (const file of arquivos) {
    const fullPath = path.join(dir, file);
    try {
      const conteudo = fs.readFileSync(fullPath, 'utf8');
      const produtos = JSON.parse(conteudo);

      // Índice local para esse arquivo específico
      const slugsDoArquivo = {};

      for (const produto of produtos) {
        const slug = produto.slug;
        if (slug) {
          slugIndex[slug] = file;
		  slugsDoArquivo[slug] = file;
        }
      }
	  
	  
	  // Salvar arquivo de slugs individual, somente para arquivos da pasta awin
      if (dir.endsWith('awin')) {
        const nomeBase = path.parse(file).name.toLowerCase(); // Ex: "NOME.json" → "nome"
        const caminhoSaidaIndividual = path.join(slugAwinFolder, `slugs_${nomeBase}.json`);

		const slugsArray = Object.keys(slugsDoArquivo).map(slug => ({slug}));
		  
        fs.writeFileSync(caminhoSaidaIndividual, JSON.stringify(slugsArray, null, 2), 'utf8');
        console.log(`📝 Slugs salvos por arquivo em awin: ${caminhoSaidaIndividual}`);
      }

	  if (dir.endsWith('data')) {
		  
		  // salva slugs na pasta slugs-ofertas
		   const nomeBase2 = path.parse(file).name.toLowerCase(); // Ex: "NOME.json" → "nome"
           const caminhoSaidaIndividual2 = path.join( slugOfertasFolder, `slugs_${nomeBase2}.json`);
		   
		   const slugsArray2 = Object.keys(slugsDoArquivo).map(slug => ({slug}));
           fs.writeFileSync(caminhoSaidaIndividual2, JSON.stringify(slugsArray2, null, 2), 'utf8');
           console.log(`📝 Slugs salvos por arquivo em data: ${caminhoSaidaIndividual2}`);
		  
		  
		   // Copia arquivos da pasta /data para public/data/produtos
		  const destino = path.join(publicOutputPath, file);
		  fs.mkdirSync(publicOutputPath, { recursive: true });
		  fs.copyFileSync(fullPath, destino);
		  console.log(`📁 Copiado: ${file} → public/data/produtos`);
	  }
    } catch (err) {
      console.error(`❌ Erro ao processar ${file}:`, err.message);
    }
  }
}

// Salva índice de slugs
fs.writeFileSync(outputPath, JSON.stringify(slugIndex), 'utf8');
fs.writeFileSync(publicPath, JSON.stringify(slugIndex), 'utf8');

console.log(`✅ Índice de slugs gerado com sucesso em:`);
console.log(`📄 ${outputPath}`);
console.log(`🌐 ${publicPath}`);
