import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // instale com: npm install uuid



function normalizarChaves(obj) {
  const novoObj = {};
  for (const chave in obj) {
    const novaChave = chave.toLowerCase().replace(/\s+/g, '_');
    novoObj[novaChave] = obj[chave];
  }
  return novoObj;
}



function gerarSlug(texto, id, cupom) {
  if (!texto || typeof texto !== 'string') texto = 'cupom';

  return (
    texto
      .toLowerCase()
      .normalize("NFD")                    // Remove acentos
      .replace(/[\u0300-\u036f]/g, "")    // Remove marcas de acento
      .replace(/[^a-z0-9\s-]/g, "")       // Remove tudo que não for letra, número, espaço ou hífen
      .replace(/\s+/g, "-")               // Espaços viram hífen
      .replace(/-+/g, "-")                // Evita múltiplos hífens
      .replace(/^-|-$/g, "")              // Remove hífen no início/fim
    + '-' + id.toString().toLowerCase().replace(/[^a-z0-9]/g, "") + '-cupom-'+ cupom.toString().toLowerCase().replace(/[^a-z0-9]/g, "")
  );
}


async function gerarVoucherJsonComSlugs() {
  const pastaCupons = path.join(process.cwd(), 'data', 'cupons');
  const pastaSaida = path.join(process.cwd(), 'data', 'awin');
  const pastaSaidaData = path.join(process.cwd(), 'public', 'data');

  if (!fs.existsSync(pastaSaida)) {
    fs.mkdirSync(pastaSaida, { recursive: true });
  }

  const arquivos = fs.readdirSync(pastaCupons)
    .filter(f => f.startsWith('PromotionsAwin') && f.endsWith('.json'));

  if (arquivos.length === 0) {
    console.warn("❌ Nenhum arquivo PromotionsAwin*.json encontrado.");
    return;
  }

  for (const nomeArquivo of arquivos) {
    const caminho = path.join(pastaCupons, nomeArquivo);
    const conteudo = fs.readFileSync(caminho, 'utf-8');

    let cupons;
    try {
      cupons = JSON.parse(conteudo);
    } catch (e) {
      console.error("❌ Erro ao fazer parse do JSON:", e.message);
      continue;
    }

    const cuponsComSlug = cupons.map((c) => {
        const cNormalizado = normalizarChaves(c);
        const id = cNormalizado.promotion_id || cNormalizado.id || uuidv4();
        const nome =  cNormalizado.advertiser ||  cNormalizado.type || 'voucher';
		const cupom =   cNormalizado.code || '';
  
      return {
		slug: gerarSlug(nome, id, cupom),
        ...cNormalizado,
       
      };
    });

    const jsonCompleto = JSON.stringify(cuponsComSlug, null, 2);
    const jsonl = cuponsComSlug.map(c => JSON.stringify(c)).join('\n');

    const saidaJson = path.join(pastaSaida, `VOUCHER.json`);
    const saidaJsonl = path.join(pastaSaida, `VOUCHER.jsonl`);
	const saidaJsonData = path.join(pastaSaidaData, `VOUCHER.json`);

    fs.writeFileSync(saidaJson, jsonCompleto, 'utf-8');
    fs.writeFileSync(saidaJsonl, jsonl, 'utf-8');
	fs.writeFileSync(saidaJsonData, jsonCompleto, 'utf-8');

    console.log(`✅ Criados: ${saidaJson} , ${saidaJsonl} e ${saidaJsonData} `);
  }

  console.log("🏁 Finalizado.");
}


gerarVoucherJsonComSlugs();

