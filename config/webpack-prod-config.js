// webpack-prod-config.js

// contains configuration data related to prod build

const path = require("path");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = require("./paths");
const common = require("./webpack-common-config.js");

module.exports = merge(common, {
  entry: {
    vendor: ["react"],
    app: paths.appIndexJs,
  },
  mode: "production",
  output: {
    filename: "[chunkhash]_[name].js",
    path: paths.appBuild,
    publicPath: "/",
  },
  optimization: {
    minimizer: [new UglifyJSPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(paths.appSrc),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"],
          },
        },
      },
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        include: [path.resolve(paths.appSrc)],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // This enables local scoped CSS based in CSS Modules spec
              modules: {
                // discardDuplicates: true,
                // generates a unique name for each class (e.g. app__app___2x3cr)
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
