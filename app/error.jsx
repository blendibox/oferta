'use client';

export default function Error({ error, reset }) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">Algo deu errado</h1>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded"
      >
        Tentar novamente
      </button>
    </div>
  );
}
