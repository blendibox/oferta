"use client";

import React from "react";
import Link from "next/link";

export default function CupomCard({ item }) {
  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(item.code).then(() => {
        console.log("Cupom copiado: " + item.code);
      }).catch(err => {
        console.error("Erro ao copiar cupom:", err);
      });
    }
  };

  return (
    <Link href={item.link || "#"} title="Clique para Copiar Código e Ir para o Site">
      <div className="m-2 flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
        <div
          onClick={handleCopy}
          className="border-dashed border-2 text-4xl mask-clip-content inline-flex shrink-0 text-red-500 border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 hover:border-emerald-200 hover:text-white"
        >
          {item.code || "CLIQUE AQUI"}
        </div>

        <div>
          <p className="text-gray-700 dark:text-gray-400">
            <span className="font-black text-2xl text-gray-950 dark:text-white">
              {item.store.name}
            </span>
            <br />
            <span className="font-medium text-gray-950 dark:text-white">
              {item.title}
            </span>
          </p>
          *Válido até {item.vigency.endDate || "indefinido"}
        </div>
      </div>
    </Link>
  );
}
