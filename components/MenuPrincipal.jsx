"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MenuPrincipal() {
  const [categorias, setCategorias] = useState({});
  const [aberto, setAberto] = useState(true);
  const [filtro, setFiltro] = useState("");

const router = useRouter();

  useEffect(() => {
    fetch("/categorias.json")
      .then((res) => res.json())
      .then(setCategorias)
      .catch((err) => console.error("Erro ao carregar categorias:", err));
  }, []);
  
  
   const navegarComScroll = (href) => {
    router.push(href);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100); // pequena espera para a navegação acontecer
  };

  function filtrarCategorias(categorias, texto) {
    if (!texto) return categorias;
    const resultado = {};
    Object.entries(categorias).forEach(([cat, dados]) => {
      const matchCat = cat.toLowerCase().includes(texto.toLowerCase());
      let matchSub = {};
      if (dados.subcategorias) {
        matchSub = filtrarCategorias(dados.subcategorias, texto);
      }
      if (matchCat || (matchSub && Object.keys(matchSub).length > 0)) {
        resultado[cat] = {
          ...dados,
          subcategorias: Object.keys(matchSub).length > 0 ? matchSub : undefined
        };
      }
    });
    return resultado;
  }

  function renderSubcategorias(subcategorias) {
    return (
      <div className="ml-4 border-l pl-2">
        {Object.entries(subcategorias).map(([nome, dados]) => (
          <div key={nome}>
		  	  
		  <button id={nome} title={nome}
			  onClick={() => {
				navegarComScroll(`/categoria/${dados.slug}`);
				setAberto(false);
			  }}
			  className="block px-2 py-1 text-lg text-gray-800 hover:bg-emerald-100 rounded text-left w-full"
			>
			  {nome}
			</button>

            {dados.subcategorias && renderSubcategorias(dados.subcategorias)}
          </div>
        ))}
      </div>
    );
  }

  const categoriasFiltradas = filtrarCategorias(categorias, filtro);

  return (
    <>
      <button name='abreFechaMenu'
        onClick={() => setAberto(!aberto)}
        className="fixed top-4 left-4 z-[9999] bg-emerald-600 text-white p-2 rounded-md shadow-md"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
      >
        {aberto ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
      </button>

      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-white shadow-lg w-84 p-4 transition-transform duration-300 ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Alterar o título aqui */}
        <div className="text-2xl font-bold mb-4 text-center ml-5 text-sky-950 text-shadow-2xs text-shadow-sky-100">
		Compare Ofertas <b className="text-pink-500">✱</b>
		</div>
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Filtrar departamentos..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
        <div className="overflow-y-auto h-full space-y-2 pr-2">
          {Object.keys(categoriasFiltradas).length === 0 ? (
            <div className="text-gray-400 text-sm">Nenhum departamento encontrado.</div>
          ) : (
            Object.entries(categoriasFiltradas).map(([categoria, dados]) => (
              <div key={categoria}>
				
				<button id={categoria} title={categoria}
				  onClick={() => {
					navegarComScroll(`/categoria/${dados.slug}`);
					setAberto(false);
				  }}
				  className="block px-2 py-1 text-lg text-gray-800 hover:bg-emerald-100 rounded text-left w-full"
				>
				  {categoria}
				</button>
                {dados.subcategorias && renderSubcategorias(dados.subcategorias)}
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}