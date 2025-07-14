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
				className={`flex justify-between items-center px-3 py-1 text-sm hover:bg-gray-700 rounded ${
				  dados.subcategorias ? 'bg-gray-800 text-white font-semibold' : 'text-gray-300 bg-white'
				}`}
			  >
				<span>{nome}</span>
				{dados.subcategorias && (
				  <span className="ml-2 text-xs opacity-70">▶</span> 
				)}
			  </Link>

			  {dados.subcategorias && (
				<div className="hidden group-hover:block absolute left-full top-0 w-48 bg-white text-black shadow z-50 rounded">
				  {renderSubcategorias(dados.subcategorias)}
				</div>
			  )}
			</div>
			
            {dados.subcategorias && (
              <div className="hidden group-hover:block absolute left-full top-0 w-48 bg-white shadow z-50">
                {renderSubcategorias(dados.subcategorias, nivel + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-white font-bold text-sm">
                  Compare Preço Blendibox
                </Link>
                <div className="hidden md:block ml-10">
                  <div className="flex space-x-2 flex-wrap">
                    {Object.entries(categorias).map(([categoria, dados]) => (
                      <div key={categoria} className="relative group">
                        <Link
                          href={`/categoria/${dados.slug}`}
                          className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                        >
                          {categoria}
                        </Link>
                        {dados.subcategorias && (
                           <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
                            {renderSubcategorias(dados.subcategorias)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
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
					className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
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
