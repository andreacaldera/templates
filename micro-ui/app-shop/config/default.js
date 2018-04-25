export default ({
  apps: [
    {
      name: 'app-product',
      containerId: 'app-product',
      port: 4001,
      cssPath: '/dist/app-product.css',
      jsPath: '/dist/app-product.js',
      urlPathRegex: '/products',
    },
    {
      name: 'app-checkout',
      containerId: 'app-checkout',
      port: 5001,
      cssPath: '/dist/app-checkout.css',
      jsPath: '/dist/app-checkout.js',
      urlPathRegex: '/checkout',
    },
    {
      name: 'app-footer',
      containerId: 'app-footer',
      port: 6001,
      cssPath: '/dist/app-footer.css',
      jsPath: '/dist/app-footer.js',
      urlPathRegex: '/*',
    },
  ],
});
