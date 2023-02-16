import '../styles/global.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          charSet="UTF-8"
          key="charset"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="icon"
          href="/icons/icon-16x16.png"
        />
        <link
          rel="icon"
          href="/icons/icon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="favicon"
          href="/icons/icon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="manifest"
          href="/manifest.json"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
