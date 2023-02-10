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
    },
  }),
);
