const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  bail: true,
  mode: 'production',
  entry: './src/client/index',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve('dist', 'public'),
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsPlugin({ path: 'dist' }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new CopyWebpackPlugin([{ from: 'src/assets/*', to: '../' }], {}),
    new MiniCssExtractPlugin({
      filename: 'ipanda.[name].css',
      chunkFilename: 'ipanda.[chunkhash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendors.bundle.[chunkhash].js',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|eot|svg|ttf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
}
