'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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


export default function BreadcrumbCategoria() {
  const pathname = usePathname(); // ex: /categoria/maquiagem/rosto/base-liquida
  const partes = pathname
    .replace(/^\/categoria\//, '')
    .split('/')
    .filter(Boolean);

  const caminhoAcumulado = [];
  
  return (
  <nav aria-label="Breadcrumb" className="text-sm">
  <ol className="flex flex-wrap items-center space-x-1 text-gray-700">
    <li>
      <div className="flex items-center">
        <Link href="/" className="flex items-center hover:text-emerald-600">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 2.293a1 1..." />
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
            <Link href={href} className="hover:text-emerald-600">
              {nomeFormatado}
            </Link>
          )}
        </li>
      );
    })}
  </ol>
</nav>

  );
}
