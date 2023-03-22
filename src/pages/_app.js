import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <div className="bg-[#f0f1f2]">
            <Head>
                <title>Read Comic</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/x-icon" href="/assets/favicon.png"></link>
            </Head>

            <Component {...pageProps} />
        </div>
    );
}
