import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Track page views on route change
    const handleRouteChange = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (window as any).umami !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).umami.track("pageview");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="7edd7adf-e207-4587-b267-49158dc3c2dc"
        strategy="lazyOnload"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
