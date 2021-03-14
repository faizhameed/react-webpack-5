// webpack-prod-config.js

// contains configuration data related to prod build

const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');
const common = require('./webpack-common-config.js');

module.exports = merge(common, {
  entry: {
    vendor: ['react'],
    app: path.resolve(__dirname, 'src/index.js'),
  },
  mode: 'production',
  output: {
    filename: '[chunkhash]_[name].js',
    path: paths.appBuild,
    publicPath: '/',
  },
  optimization: {
    minimizer: [new UglifyJSPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(paths.appSrc),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: paths.appSrc,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
});
