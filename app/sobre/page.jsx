'use client';

import { useEffect } from 'react';

export default function Sobre() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-16">
      <nav className="flex flex-wrap gap-6 text-emerald-600 text-sm border-b pb-4">
        <a href="#sobre-nos" className="hover:underline">Sobre nós</a>
        <a href="#termos" className="hover:underline">Termos de Uso</a>
        <a href="#privacidade" className="hover:underline">Privacidade</a>
        <a href="#contato" className="hover:underline">Contato</a>
      </nav>

      <section id="sobre-nos">
        <h2 className="text-2xl font-bold mb-2">Sobre nós</h2>
        <p className="text-gray-700">
          O Comprar.Blendibox nasceu com o propósito de facilitar sua jornada de compras online. Reunimos produtos de mais de 100 marcas confiáveis como O Boticário, Nike, Mizuno, C&A, Eudora, Stanley, Galvic, entre outras. Nosso comparador permite que você visualize rapidamente os preços e ofertas em um só lugar, encontre cupons exclusivos e seja redirecionado direto para a loja oficial da marca, sem intermediários. Transparência, agilidade e economia são os pilares que guiam nossa plataforma.
        </p>
      </section>

      <section id="termos">
        <h2 className="text-2xl font-bold mb-2">Termos de Uso</h2>
        <p className="text-gray-700">
          Ao utilizar nosso site, você concorda com os termos aqui estabelecidos. Nós oferecemos um serviço gratuito de comparação de preços e produtos, mas não vendemos diretamente os itens. Todas as transações são realizadas nas lojas parceiras. Não nos responsabilizamos por alterações de preços ou disponibilidade após o redirecionamento. É de responsabilidade do usuário verificar os dados do produto e condições de compra no site final.
        </p>
      </section>

      <section id="privacidade">
        <h2 className="text-2xl font-bold mb-2">Política de Privacidade</h2>
        <p className="text-gray-700">
          Valorizamos sua privacidade. Coletamos apenas informações necessárias para melhorar sua experiência, como dados de navegação e preferências de busca. Não compartilhamos seus dados com terceiros sem consentimento. Utilizamos cookies para fins analíticos e funcionais. Você pode desativá-los nas configurações do seu navegador, mas isso pode impactar a usabilidade da plataforma.
        </p>
      </section>

      <section id="contato">
        <h2 className="text-2xl font-bold mb-2">Contato</h2>
        <p className="text-gray-700">
          Se tiver dúvidas, sugestões ou quiser falar com a equipe do Comprar.Blendibox, entre em contato pelo e-mail <a href="loja@blendibox.com.br" className="text-emerald-600 underline">loja@blendibox.com.br</a>. Estamos sempre abertos para ouvir você e melhorar ainda mais nossa plataforma.
        </p>
      </section>
    </div>
  );
}
