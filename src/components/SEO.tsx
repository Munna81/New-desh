import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function SEO({
  title = "Buy Local goods, Build our Nation",
  description = "Choose locally made products to empower businesses, create jobs, and promote sustainability.",
  image = "https://usedeshi.blob.core.windows.net/use-deshi-images/og-image.jpg",
}: SEOProps) {
  const router = useRouter();
  const { locale } = router;

  const siteTitle =
    locale === "bn"
      ? "দেশি পণ্য কিনুন, অর্থনীতিতে ভূমিকা রাখুন"
      : "Buy Local Goods, Build Our Nation";
  const canonicalUrl = `https://shodeshbazar.com${router.asPath}`;

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta
        property="og:locale"
        content={locale === "bn" ? "bn_BD" : "en_US"}
      />

      {/* For Facebook Comments */}
      <meta property="fb:app_id" content="1115308760079585" />
    </Head>
  );
}
