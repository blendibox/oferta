import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// para marcas
process.env.COUNTER=1;

function copiaSomenteTarget(outDir, target) {
  const origem = path.join('out', target);
  const destino = path.join(outDir, target);

  if (!fs.existsSync(origem)) {
    console.warn(`⚠️ Pasta não encontrada: ${origem}`);
    return;
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.cpSync(origem, destino, { recursive: true });
}

    // marcas promo, cupom 

	
    const pastaLotes = path.join('data', 'slugs-lotes');
	
    const arquivosLotes = fs
     .readdirSync(pastaLotes);
     //.filter((f) => f.startsWith(`slugs_${marca}_`) && f.endsWith('.jsonl')); // filtra por marca, que não -e o caso

	if (arquivosLotes.length === 0) {
	  console.warn(`⚠️ Nenhum arquivo de lote encontrado em ${pastaLotes}`);
	  process.exit(0);
	}

    let index = 0;
	for (const arquivo of arquivosLotes) {
		
	  const marca =  arquivo.replace(/^slugs_/, '').replace(/_\d+\.jsonl$/, ''); 
	  
	  index  = process.env.COUNTER;
		
	  const src = path.join(pastaLotes, arquivo);
	  const outDir = `out-${marca}-lote-${index}`;
      const envVars = `LOTE=${index} BUILD_TARGET=${marca.toLowerCase()} SLUGS_FILE=slugs_${marca}_${index}.jsonl`;
	  

	  // Executa build passando a marca como variável de ambiente (se quiser usar em generateStaticParams)
	  console.log(`🚀 Gerando build do lote ${index} → ${outDir}`);
	  execSync(`cross-env ${envVars} next build`, { stdio: 'inherit' });
	  
	  // Copiar apenas o diretório relevante para o lote
      copiaSomenteTarget(outDir, marca); 
	  
	  console.log(`✅ Finalizado: slugs_${marca}_${index}.jsonl`);
	  
	  process.env.COUNTER++;
	}
  



console.log('✅ Todos os lotes foram processados com sucesso!');