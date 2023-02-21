// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withVideos = require('next-videos');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withVideos(
  withBundleAnalyzer({
    eslint: {
      dirs: ['src'],
    },
    poweredByHeader: false,
    trailingSlash: true,
    reactStrictMode: true,
    images: {},
    env: {
      SITE_NAME: process.env.SITE_NAME,
      AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
      AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
      API_URL: process.env.API_URL,
    },
  }),
);
