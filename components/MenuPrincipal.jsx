"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MenuPrincipal() {
  const [categorias, setCategorias] = useState({});

  useEffect(() => {
    fetch("/categorias.json")
      .then((res) => res.json())
      .then(setCategorias)
      .catch((err) => console.error("Erro ao carregar categorias:", err));
  }, []);

  function renderSubcategorias(subcategorias, nivel = 1) {
    return (
      <div className={`ml-${nivel * 4} space-y-1`}> {/* mobile */}
        {Object.entries(subcategorias).map(([nome, dados]) => (
          <div key={nome} className="group relative">
		  
           <div key={nome} className="group relative">
			  <Link
				href={`/categoria/${dados.slug}`}
				className={`flex justify-between items-center px-3 py-1 text-sm hover:bg-emerald-700  ${
				  dados.subcategorias ? 'relative z-10 bg-emerald-500 text-white font-semibold' : 'text-emerald-500 bg-white hover:text-white '
				}`}
			  >
				<span>{nome}</span>
				{dados.subcategorias && (
				  <span className="ml-2 text-xs opacity-70  z-50">▶</span> 
				)}
			  </Link>

			  {dados.subcategorias && (
				<div className="hidden group-hover:block absolute left-full top-0 z-50  w-48 bg-white text-black shadow z-50 ">
				  {renderSubcategorias(dados.subcategorias)}
				</div>
			  )}
			</div>
			
            {dados.subcategorias && (
              <div className="hidden group-hover:block absolute left-full top-0  z-50 w-48 bg-white shadow z-50">
                {renderSubcategorias(dados.subcategorias, nivel + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Disclosure as="nav" className="bg-emerald-600">
      {({ open }) => (
        <>
          <div className="mx-auto p-2 max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-white font-bold text-2xl uppercase">
                  <i>COMPARE PREÇOS<b className="text-white">✱</b></i>
                </Link>
                <div className="hidden md:block ml-10">
                  <div className="flex space-x-2 flex-wrap">
                    {Object.entries(categorias).map(([categoria, dados]) => (
                      <div key={categoria} className="relative group">
                        <Link
                          href={`/categoria/${dados.slug}`}
                          className="'relative z-10 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
                        >
                          {categoria}
                        </Link>
                        {dados.subcategorias && (
                           <div className="absolute left-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white hidden group-hover:block z-50">
                            {renderSubcategorias(dados.subcategorias)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center z-50 justify-center rounded-md bg-emerald-700 p-2 text-wite hover:bg-emerald-200 hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

			 <div className="relative flex inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
			  <div className="flex flex-1">
			  <Link href='/cupom' alt="Novos Cupons!">
				<button 
				  type="button"
				  className="relative rounded-full  p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800"
				>
				  <span className="absolute -inset-1.5" />
				  <span className="sr-only">Ver notificações</span>

				  {/* Ícone de sino */}
				  <svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					aria-hidden="true"
				  >
					<path
					  strokeLinecap="round"
					  strokeLinejoin="round"
					  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
					/>
				  </svg>

				  {/* Bolinha de notificação */}
				  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
					5
				  </span>
				</button>
				</Link>
			  </div>
			</div>
		
          </div>
		 
		 </div>

         <Disclosure.Panel as="div" className="md:hidden">
		  {({ close }) => (
			<div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
			  {Object.entries(categorias).map(([categoria, dados]) => (
				<div key={categoria}>
				  <Link
					href={`/categoria/${dados.slug}`}
					onClick={() => close()}
					className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-emerald-700"
				  >
					{categoria}
				  </Link>
				  {dados.subcategorias && renderSubcategorias(dados.subcategorias, 1, close)}
				</div>
			  ))}
			</div>
		  )}
		</Disclosure.Panel>
		  
        </>
      )}
    </Disclosure>
  );
}
