'use client';

import Link from 'next/link';
import Image from  'next/image';
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
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-2xl font-bold mb-3 text-center pt-3  text-white text-shadow-2xs text-shadow-sky-100 ">Compare Ofertas <b className="text-pink-500">✱</b>
		  <div  className="bg-cyan-400 rounded-full max-w-200 max-h-40">
		   <Image
                  src="/images/banner.webp"
                  alt='Logo Blendibox'
				  width='100'
				  height='50'
                  className="w-full h-40 object-contain my-2 rounded-full p-2 drop-shadow-xl"
				  blurDataURL="/images/blendibox.webp"
				  placeholder="blur"
                />
				</div>
		  </h2>
          <p className="mt-2 text-sm text-gray-100 ">
            Compare Preços de milhares de Produtos de Marcas famosas: como Nike, Boticário, Kipling, C&A e muito mais.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase text-gray-100">Navegação</h3>
          <ul className="space-y-1 text-sm">
            <li><button name='home' onClick={() => navegarComScroll('/')} className="hover:underline text-gray-100">Início</button></li>
            <li><button name='cupom' onClick={() => navegarComScroll('https://comprar.blendibox.com.br/cupom')} className="hover:underline text-gray-100">Cupons</button></li>
            <li><button name='moda feminina' onClick={() => navegarComScroll('https://modafeminina.blendibox.com.br/categoria/calca')} className="hover:underline text-gray-100">Moda Feminina</button></li>
            <li><button name='moda masculina' onClick={() => navegarComScroll('https://modamasculina.blendibox.com.br/categoria/tenis')} className="hover:underline text-gray-100">Moda Masculina</button></li>
            <li><button name='moda infantil' onClick={() => navegarComScroll('https://modakids.blendibox.com.br/categoria/tenis')} className="hover:underline text-gray-100">Moda Infantil</button>	</li>		
		   <li><button name='make' onClick={() => navegarComScroll('https://comprar.blendibox.com.br//categoria/maquiagem')} className="hover:underline text-gray-100">Maquiagem</button></li>
           <li><button name='busca' onClick={() => navegarComScroll('https://comprar.blendibox.com.br/busca?nike')} className="hover:underline text-gray-100">Nike</button></li>
           
		  </ul>
        </div>
		<div>
          <h3 className="text-sm font-semibold mb-2 uppercase text-gray-100">Cursos</h3>
          <ul className="space-y-1 text-sm">
            <li><Link name='cursos fitness' href="https://fitness.blendibox.com.br/" className="hover:underline text-gray-100">Cursos fitness</Link></li>
            <li><Link name='cursos confeitaria' href="https://cursoconfeitaria.blendibox.com.br/" className="hover:underline text-gray-100">Cursos Confeitaria</Link></li>
		  <li><Link name='cursos confeitaria' href="https://cursoconfeitaria.blendibox.com.br/chefisisalvarez" className="hover:underline text-gray-100">Cursos Isis Alvarez</Link></li>
		  <li><Link name='cursos confeitaria' href="https://cursoconfeitaria.blendibox.com.br/chefmarrarabortoloti" className="hover:underline text-gray-100">Cursos Marrara Bortoloti</Link></li>
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
        © {ano} <Link href="https://www.blendibox.com.br">Blendibox. Todos os direitos reservados.</Link>
      </div>
    </footer>
  );
}