"use client";

import React from "react";
import Link from "next/link";

export default function CupomCard2({ item }) {
  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(item.couponcode).then(() => {
        console.log("Cupom copiado: " + item.couponcode);
      }).catch(err => {
        console.error("Erro ao copiar cupom:", err);
      });
    }
  };

  return (
    <Link href={item.clickurl || "#"} title={item.couponcode?"Clique para Copiar Código e Ir para o Site":"Clique para Ir para o Site"}>
      <div className="m-2 flex grid gap-4 rounded-lg bg-white p-2 shadow-md outline outline-black/5 ">
        <div
          onClick={handleCopy}
          className="border-dashed border-2 text-4xl mask-clip-content inline-flex shrink-0 text-red-500 border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 hover:border-emerald-200 hover:text-white"
        >
          {item.couponcode || "CLIQUE AQUI"}
        </div>

        <div>
          <p className="text-gray-700 dark:text-gray-400">
            <span className="font-black text-2xl text-gray-950 dark:text-white">
              {item.advertisername}
            </span>
            <br />
            <span className="font-medium text-gray-950 dark:text-white">
              {item.offerdescription}
            </span>
          </p>
          *Válido até {item.offerenddate || "indefinido"}
		  	  	 <p> Sujeito a disponibilidade do lote de cupons</p>
        </div>
      </div>
    </Link>
  );
}
