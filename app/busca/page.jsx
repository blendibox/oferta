'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PaginaBusca() {
  const [query, setQuery] = useState('');
  const [slugIndex, setSlugIndex] = useState({});
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    fetch('slug-index.json')
      .then((res) => res.json())
      .then((data) => setSlugIndex(data));
  }, []);

  const handleSearch = (e) => {
    const termo = e.target.value.toLowerCase();
    setQuery(termo);

    const normalQuery = termo.replace(/\s+/g, ' ').trim(); // "bolsa rosa" -> "bolsa rosa"
    const palavras = normalQuery.split(' '); // ['bolsa', 'rosa']

    const filtrados = Object.entries(slugIndex).filter(([slug]) => {
      const normalSlug = slug.toLowerCase().replace(/-/g, ' ');
      // verifica se todas as palavras digitadas estão no slug
      return palavras.every(palavra => normalSlug.includes(palavra));
    });

    setResultados(filtrados);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Buscar Produtos</h1>

      <input
        type="text"
        placeholder="Digite parte do nome do produto..."
        value={query}
        onChange={handleSearch}
        className="w-full p-3 border rounded mb-6"
      />

      {query && resultados.length === 0 && (
        <p className="text-gray-500">Nenhum resultado encontrado.</p>
      )}

      <ul className="space-y-4">
        {resultados.map(([slug, origem], i) => (
          <li key={i} className="p-4 border rounded hover:shadow">
            <Link href={`/produto/${slug}`} className="text-blue-600 hover:underline">
              {slug.replace(/-/g, ' ')}
            </Link>
            <p className="text-sm text-gray-500">Origem: {origem}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
