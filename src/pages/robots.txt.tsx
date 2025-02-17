import { GetServerSideProps } from "next";

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Get the host from request headers
  const hostname = req.headers.host || "";

  // Check if it's production domain
  const isProduction = hostname === "shodeshbazar.com";

  // Different content for production vs other environments
  const content = isProduction
    ? `User-agent: *
Allow: /
Sitemap: https://shodeshbazar.com/sitemap.xml`
    : `User-agent: *
Disallow: /`;

  res.setHeader("Content-Type", "text/plain");
  res.write(content);
  res.end();

  return {
    props: {},
  };
};

export default Robots;
