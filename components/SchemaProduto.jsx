import React from 'react';

export default function SchemaProduto({ title, image, link, brand, priceGoogle }) {
	
	const description = `Procurando onde comprar ${title}? Acesse, Compare Ofertas, encontre Cupons para ${title} de forma dinâmica. Milhares de Ofertas e Cupons de desconto de grandes Marcas.`;
	
  const schema = [
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
      "headline": title,
      "datePublished": "2023-03-03T12:02:41Z",
      "dateModified": "2023-03-03T12:02:41Z",
      "description": description,
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
      description: description,
	  brand: {
        "@type": "Brand",
        name: brand,
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
   <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}