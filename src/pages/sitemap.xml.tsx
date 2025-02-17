import { GetServerSideProps } from "next";
import categoriesData from "@/data/categories.json";

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { categories } = categoriesData;
  const lastmod = process.env.NEXT_PUBLIC_DEPLOY_DATE || "2025-02-08";
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "shodeshbazar.com";
  const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

  if (!isProduction) {
    res.write(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
    );
    res.end();
    return { props: {} };
  }

  // Static pages
  const staticPages = ["", "/about", "/support"];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>https://${baseUrl}${page}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>${page === "" ? "daily" : "monthly"}</changefreq>
          <priority>${page === "" ? "1.0" : "0.8"}</priority>
          <xhtml:link rel="alternate" hreflang="en" href="https://${baseUrl}/en${page}"/>
          <xhtml:link rel="alternate" hreflang="bn" href="https://${baseUrl}/bn${page}"/>
        </url>
      `
        )
        .join("")}
      
      ${categories
        .map(
          (category) => `
        <url>
          <loc>https://${baseUrl}/category/${category.slug}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
          <xhtml:link rel="alternate" hreflang="en" href="https://${baseUrl}/en/category/${category.slug}"/>
          <xhtml:link rel="alternate" hreflang="bn" href="https://${baseUrl}/bn/category/${category.slug}"/>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
