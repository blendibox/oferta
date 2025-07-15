'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import categorias from '../public/categorias.json'; // ajuste esse import conforme seu projeto


function deslugify(slug) {
	
 // Lista de termos que devem manter o hífen
  const manterHifen = ['anti-idade', 'auto-estima', 'pos-sol', 'meia-calça', 'leave-in','pos-barba','leave-in e creme para pentear'];
  const preposicoesMinusculas = ['de', 'da', 'do', 'das', 'dos', 'para', 'e'];
  const conectores = { and: '&' };
  
    if (manterHifen.includes(slug)) {
		return slug
		  .split('-')
		  .map((palavra, i) => {
			  if (conectores[palavra]) return conectores[palavra];
			  if (preposicoesMinusculas.includes(palavra) && i !== 0) return palavra;
			  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
			})
		  .join('-'); // mantém o hífen
	  }

  return slug
    .split('-')
    .map((palavra, i) => {
      if (conectores[palavra]) return conectores[palavra];
      if (preposicoesMinusculas.includes(palavra) && i !== 0) return palavra;
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
  
}

function encontrarCategoriaPorCaminho(categorias, partes) {
  let obj = categorias;
  let categoriaAtual = null;
  


  for (const parte of partes) {
    let proxima = null;

    // Buscar pelo nome da categoria
    if (obj[parte]) {
      proxima = obj[parte];
    } else {
      // Buscar pelo slug (última parte)
      proxima = Object.values(obj).find(cat => {
        const partesSlug = cat.slug.split('/');
        return partesSlug[partesSlug.length - 1] === parte;
      });
    }

    if (!proxima) {
      categoriaAtual = null;
      break;
    }
    categoriaAtual = proxima;
    obj = categoriaAtual.subcategorias || {};
  }
  console.log(categoriaAtual);
  return categoriaAtual;
}

export default function BreadcrumbCategoria() {
  const pathname = usePathname(); // ex: /categoria/maquiagem/rosto/base-liquida
  const router = useRouter();
  const partes = pathname
    .replace(/^\/categoria\//, '')
    .split('/')
    .filter(Boolean);

  const caminhoAcumulado = [];
  
  
   function handleBreadcrumbClick(i) {
    const caminho = partes.slice(0, i + 1);
    const categoriaObj = encontrarCategoriaPorCaminho(categorias, caminho);
    if (categoriaObj && categoriaObj.arquivos && categoriaObj.arquivos.length > 0) {
		 // Só navega para a categoria normalmente
      router.push(`/categoria/${caminho.join('/')}`);
    }
  }
  
  return (
  
  <nav aria-label="Breadcrumb" className="text-sm">
  <ol className="flex flex-wrap items-center space-x-1 text-gray-700">
    <li>
      <div className="flex items-center">
        <Link href="/" className="flex items-center hover:text-emerald-600">
				
		<svg className="w-4 h-4 mr-1"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
		<path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
		</svg>
         
          Home
        </Link>
      </div>
    </li>

    {partes.map((parte, i) => {
      const isLast = i === partes.length - 1;
      caminhoAcumulado.push(deslugify(parte));
      const href = `/categoria/${caminhoAcumulado.join('/')}`;
      const nomeFormatado = deslugify(parte);


      return (
        <li key={i} className="flex items-center">
          <svg
            className="mx-2 h-4 w-4 text-gray-400"
            viewBox="0 0 24 44"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M.293 0l22 22-22 22H1.7l22-22L1.7 0H.293z" />
          </svg>
          {isLast ? (
            <span className="text-gray-500">{nomeFormatado}</span>
          ) : (
             <span
                  className="hover:text-emerald-600 cursor-pointer"
                  onClick={() => handleBreadcrumbClick(i)}
                >
                  {nomeFormatado}
                </span>
          )}
        </li>
      );
    })}
  </ol>
</nav>

  );
}
