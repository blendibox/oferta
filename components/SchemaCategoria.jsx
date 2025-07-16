// components/SchemaCategoria.jsx
import React from 'react';
import Head from 'next/head';

export default function SchemaCategoria({ produtos = [] }) {
  if (!produtos.length) return null;

  const lista = produtos.slice(0, 10).map((produto, i) => {
    return {
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": produto.title || '',
        "url": produto.url || '',
        "image": produto.image || '',
        "dateCreated": "2025-10-07",
        "description": produto.descript || `Compare ofertas e cupons para ${produto.title}`,
        "brand": {
          "@type": "Brand",
          "name": produto.brand || 'Sem marca'
        },
        "offers": {
          "@type": "Offer",
          "url": produto.url || '',
          "priceCurrency": "BRL",
          "price": produto.priceGoogle || "0.00",
          "priceValidUntil": "2026-12-12",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 5
          },
          "author": {
            "@type": "Person",
            "name": "Juliana"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 100,
          "bestRating": 100,
          "ratingCount": 1
        }
      }
    };
  });

  const schema = [{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": lista
  }];

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </Head>
  );
}
