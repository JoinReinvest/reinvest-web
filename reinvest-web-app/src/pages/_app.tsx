import '../styles/global.scss';

import { Amplify } from '@aws-amplify/core';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from 'components/AuthProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { env } from '../env';
import { queryClient } from '../services/queryClient';

Amplify.configure({
  aws_cognito_region: env.aws.cognito.region,
  aws_user_pools_id: env.aws.cognito.userPoolId,
  aws_user_pools_web_client_id: env.aws.cognito.clientId,
});

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
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            {!env.isProduction && <ReactQueryDevtools initialIsOpen={false} />}
          </Hydrate>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};

export default App;
