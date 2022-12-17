const siteUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/admin/*" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
  priority: 1.0,
  sitemapSize: 7000,
  exclude: ["/admin/*"],
  outDir: "./out",
};
