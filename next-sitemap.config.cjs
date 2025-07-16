/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:  'https://comprar.blendibox.com.br',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000, // Divide o sitemap em múltiplos arquivos a cada 5000 URLs
  exclude: ["/404"],
   robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ]
  },
}