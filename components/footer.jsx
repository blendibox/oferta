'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const ano = new Date().getFullYear();

  const navegarComScroll = (href) => {
    router.push(href);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100); // pequena espera para a navegação acontecer
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold text-emerald-400">Comprar.Blendibox</h2>
          <p className="mt-2 text-sm text-gray-400">
            Compare preços de milhares de produtos de marcas confiáveis como Nike, Boticário, Kipling, C&A e muito mais.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase text-gray-300">Navegação</h3>
          <ul className="space-y-1 text-sm">
            <li><button onClick={() => navegarComScroll('/')} className="hover:underline text-gray-400">Início</button></li>
            <li><button onClick={() => navegarComScroll('/busca')} className="hover:underline text-gray-400">Buscar Produtos</button></li>
            <li><button onClick={() => navegarComScroll('/cupom')} className="hover:underline text-gray-400">Cupons</button></li>
            <li><button onClick={() => navegarComScroll('/categoria/maquiagem')} className="hover:underline text-gray-400">Maquiagem</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase text-gray-300">Institucional</h3>
          <ul className="space-y-1 text-sm">
            <li><button onClick={() => navegarComScroll('/sobre')} className="hover:underline text-gray-400">Sobre nós</button></li>
            <li><button onClick={() => navegarComScroll('/termos')} className="hover:underline text-gray-400">Termos de Uso</button></li>
            <li><button onClick={() => navegarComScroll('/privacidade')} className="hover:underline text-gray-400">Privacidade</button></li>
            <li><button onClick={() => navegarComScroll('/contato')} className="hover:underline text-gray-400">Contato</button></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {ano} Comprar.Blendibox. Todos os direitos reservados.
      </div>
    </footer>
  );
}