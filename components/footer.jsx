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
    <footer className="mt-10 min-h-[120px] bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold text-emerald-400">Comprar.Blendibox</h2>
          <p className="mt-2 text-sm text-gray-100">
            Compare preços de milhares de produtos de marcas confiáveis como Nike, Boticário, Kipling, C&A e muito mais.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase text-gray-100">Navegação</h3>
          <ul className="space-y-1 text-sm">
            <li><button name='home' onClick={() => navegarComScroll('/')} className="hover:underline text-gray-100">Início</button></li>
            <li><button name='busca' onClick={() => navegarComScroll('/busca')} className="hover:underline text-gray-100">Buscar Produtos</button></li>
            <li><button name='cupom' onClick={() => navegarComScroll('/cupom')} className="hover:underline text-gray-100">Cupons</button></li>
            <li><button name='make' onClick={() => navegarComScroll('/categoria/maquiagem')} className="hover:underline text-gray-100">Maquiagem</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase text-gray-100">Institucional</h3>
          <ul className="space-y-1 text-sm">
            <li><button name='sobre' onClick={() => navegarComScroll('/sobre#sobre-nos')} className="hover:underline text-gray-100">Sobre nós</button></li>
            <li><button name='termos' onClick={() => navegarComScroll('/sobre#termos')} className="hover:underline text-gray-100">Termos de Uso</button></li>
            <li><button name='privacidade' onClick={() => navegarComScroll('/sobre#privacidade')} className="hover:underline text-gray-100">Privacidade</button></li>
            <li><button name='contato' onClick={() => navegarComScroll('/sobre#contato')} className="hover:underline text-gray-100">Contato</button></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-100">
        © {ano} Comprar.Blendibox. Todos os direitos reservados.
      </div>
    </footer>
  );
}