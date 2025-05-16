const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa');

const isDev = process.env.NODE_ENV === 'development';

const withPWAFunc = withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
});

module.exports = withPWAFunc({
  reactStrictMode: true,
  swcMinify: true,
});
