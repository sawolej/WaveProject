// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
// module.exports = { // CommonJS  .js
export default {      // JS module .mjs
  // root: '/src',
  mount: {
    'src/': {url: '/'}
    // 'src/': {url: '/', static: true, resolve: false},
    // 'src/js/': {url: '/js', static: true, resolve: false},
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    source: 'local'
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // watch: true
  },
  optimize: {
    sourcemap: 'external',
    splitting: true,
    bundle: true,
    minify: true,
    target: 'es2018'
  },
};
