/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:  'https://comprar.blendibox.com.br',
  generateRobotsTxt: true, // (optional)
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