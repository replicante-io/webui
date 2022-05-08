'use strict';
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DISTRIBUTION_ROOT = path.resolve(__dirname, 'dist');
const STATIC_ROOT = path.resolve(DISTRIBUTION_ROOT, 'static');
const INDEX_PATH = path.resolve(DISTRIBUTION_ROOT, 'index.html');

const RULES_BABEL = {
  test: /\.m?jsx?$/,
  exclude: /node_modules/,
  use: [
    'babel-loader',
  ],
};
const RULES_CSS = {
  test: /\.(sa|sc|c)ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
};

module.exports = {
  entry: {
    index: './client/src/index.js',
  },
  module: {
    rules: [
      RULES_BABEL,
      RULES_CSS,
    ],
  },
  output: {
    clean: true,
    filename: '[name].[chunkhash].js',
    path: STATIC_ROOT,
    publicPath: '/static/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: INDEX_PATH,
      template: 'client/index.ejs',
      title: 'Replicante WebUI',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),
  ],
}
