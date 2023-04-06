// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withVideos = require('next-videos');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withSentryConfig(
  withVideos(
    withBundleAnalyzer({
      transpilePackages: ['reinvest-app-common'],
      eslint: {
        dirs: ['src'],
      },
      poweredByHeader: false,
      trailingSlash: true,
      reactStrictMode: true,
      images: {
        domains: ['images.ctfassets.net'],
      },
      env: {
        SITE_NAME: process.env.SITE_NAME,
        REINVEST_SITE_URL: process.env.REINVEST_SITE_URL,
        AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
        AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
        AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
        API_URL: process.env.API_URL,
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
        GOOGLE_MAPS_PLACES_URL: process.env.GOOGLE_MAPS_PLACES_URL,
        GOOGLE_MAPS_AUTOCOMPLETE_URL: process.env.GOOGLE_MAPS_AUTOCOMPLETE_URL,
        SENTRY_DSN: process.env.SENTRY_DSN,
      },
      redirects: async () => {
        return [{ source: '/referral/:id', destination: '/register/?referral=:id', permanent: true }];
      },
      headers: async () => {
        return [
          {
            source: '/.well-known/apple-app-site-association',
            headers: [{ key: 'content-type', value: 'application/json' }],
          },
        ];
      },
    }),
  ),
  { silent: process.env.NODE_ENV === 'development' },
);
