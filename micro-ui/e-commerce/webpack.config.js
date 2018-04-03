const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'e-commerce': ['./src/client/index.js', './style/e-commerce.scss'],
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
    new ExtractTextPlugin({ filename: 'dist/e-commerce.css', allChunks: true }),
  ],
};
