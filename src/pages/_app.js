import "@/styles/globals.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-[#f0f1f2]">
      <Head>
        <title>
          Read Manhwa, Manhwa Hentai, Manhwa 18, Hentai Manga, Hentai Comics, E
          hentai, Porn Comics | ManhwaCo.Com
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
        <meta
          name="description"
          content="Read Free Online Manhwa, Manhwa 18, Hentai Comics, Webtoon Hentai, Manhua Hentai, Manga Hentai, Adult Manhwa, Hentai Webtoon, Manhwaco. Along with brand new series! Updated Daily!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@manhwaco" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <NextNProgress color="#BE123C" />
    </div>
  );
}
