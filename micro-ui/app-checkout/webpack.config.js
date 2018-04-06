const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'app-checkout': ['./src/client/index.js', './style/app-checkout.scss'],
  },
  output: {
    filename: 'dist/[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'dist/app-checkout.css', allChunks: true }),
  ],
};
