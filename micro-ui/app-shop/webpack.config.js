const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'app-shop': ['./src/client/index.js', './style/app-shop.scss'],
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
    new ExtractTextPlugin({ filename: 'dist/app-shop.css', allChunks: true }),
  ],
};
