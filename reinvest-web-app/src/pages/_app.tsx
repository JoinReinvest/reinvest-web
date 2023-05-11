import '../styles/global.scss';

import { Amplify } from '@aws-amplify/core';
import * as Sentry from '@sentry/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from 'providers/AuthProvider';
import { useState } from 'react';

import { env } from '../env';

Sentry.init({
  dsn: env.sentry.dsn,
  tracesSampleRate: env.isProduction ? 0.2 : 1.0,
});

Amplify.configure({
  aws_cognito_region: env.aws.cognito.region,
  aws_user_pools_id: env.aws.cognito.userPoolId,
  aws_user_pools_web_client_id: env.aws.cognito.clientId,
});

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            suspense: false,
            retry: false,
          },
        },
      }),
  );

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
        <AuthProvider isProtectedPage={pageProps.protected}>
          <Component {...pageProps} />
          {!env.isProduction && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
