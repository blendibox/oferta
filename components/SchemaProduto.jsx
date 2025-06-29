import React from 'react';
import Head from 'next/head';

export default function SchemaProduto({ title, image, link, brand, priceGoogle }) {
  const schema = [
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
      "headline": title,
      "datePublished": "2023-03-03T12:02:41Z",
      "dateModified": "2023-03-03T12:02:41Z",
      "description": `Procurando onde comprar ${title} original? Clique aqui e encontre com o melhor preço, a melhor forma de pagamento, a entrega mais rápida e o melhor preço de frete. Clique agora e confira! Observação: Poucas unidades! Oferta válida enquanto durarem os estoques! Corre pois está quase esgotado. Oferta exclusiva ${title}`,
      "author": {
        "@type": "Person",
        "name": "Juliana",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Blendibox",
        "logo": {
          "@type": "ImageObject",
          "url": "https://comprar.blendibox.com.br/favicon.ico",
          "width": 40,
          "height": 40,
        },
      },
      "image": {
        "@type": "ImageObject",
        "url": image,
        "height": 205,
        "width": 205,
      },
    },
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: title,
      image: image,
      url: link,
      description: `Procurando onde comprar ${title} original? Clique aqui e encontre com o melhor preço, a melhor forma de pagamento, a entrega mais rápida e o melhor preço de frete. Clique agora e confira! Observação: Poucas unidades! Oferta válida enquanto durarem os estoques! Corre pois está quase esgotado. Oferta exclusiva ${title}`,
      brand: {
        "@type": "Brand",
        name: brand?.replace("-", " "),
      },
      offers: {
        "@type": "Offer",
        url: link,
        priceCurrency: "BRL",
        price: priceGoogle,
        priceValidUntil: "2023-12-12",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Juliana",
          },
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "100",
        bestRating: "100",
        ratingCount: "1",
      },
    }
  ];

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