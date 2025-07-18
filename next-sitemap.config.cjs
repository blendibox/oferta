/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:  'https://comprar.blendibox.com.br',
  generateRobotsTxt: false,
  sitemapSize: 1000,
   exclude: [
	  "/404",
	  "/*/__dummy__"
	],
  outDir: './out',
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: ["/404"] },
      { userAgent: "*", allow: "/" },
    ]
  },
}