'use client';

import { useEffect, useState } from 'react';

export default function CompararProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    fetch('/data/MIZUNO.json')
      .then(res => res.json())
      .then(setProdutos);
  }, []);

  const resultados = produtos
    .filter(p => p['g:title']?.toLowerCase().includes(busca.toLowerCase()))
    .slice(0, 10);

  const toggleSelecionado = (produto) => {
    const jaSelecionado = selecionados.find(p => p['g:id'] === produto['g:id']);
    if (jaSelecionado) {
      setSelecionados(selecionados.filter(p => p['g:id'] !== produto['g:id']));
    } else if (selecionados.length < 3) {
      setSelecionados([...selecionados, produto]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Comparar Produtos</h1>

      <input
        type="text"
        placeholder="Buscar produto..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <div className="bg-gray-100 p-4 mb-6 rounded">
        <p className="mb-2 text-gray-600">Produtos selecionados para comparação:</p>
        <div className="grid grid-cols-3 gap-4">
          {selecionados.map(p => (
            <div key={p['g:id']} className="border p-2 bg-white">
              <p className="font-bold">{p['g:title']}</p>
              <p>{p['g:price']}</p>
              <img src={p['g:image_link']} alt={p['g:title']} className="w-full h-auto" />
              <button
                onClick={() => toggleSelecionado(p)}
                className="text-red-600 mt-2"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {resultados.map(p => (
          <div
            key={p['g:id']}
            onClick={() => toggleSelecionado(p)}
            className="border p-4 rounded cursor-pointer hover:bg-emerald-100 transition"
          >
            <p className="font-bold">{p['g:title']}</p>
            <p>{p['g:price']}</p>
            <img src={p['g:image_link']} alt={p['g:title']} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
