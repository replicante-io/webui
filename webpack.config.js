'use strict';

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_ROOT = path.resolve(__dirname, 'dist');


// Configure the generation of `index.html`.
const index = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'ejs-loader!client/index.ejs',
  title: 'Replicante WebUI'
});


// Configure babel rule for ES6 in JavaScript.
const babel_rule = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
};


// Process styles to create a (versioned) CSS bundle.
// This has two parts:
//
//   * The extraction plugin (here) to wrtie extracted chunks to a file.
//   * A loader rule (below) to collect all chunks for the plugin.
const style_plugin = new ExtractTextPlugin({
  allChunks: true,
  filename: 'static/styles.[chunkhash].css'
});

// Configure SASS extraction as described by bootsrap 4:
//    https://getbootstrap.com/docs/4.0/getting-started/webpack/#importing-precompiled-sass
const style_rule = {
  test: /\.(scss)$/,
  use: style_plugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [
            require('precss'),
            require('autoprefixer')
          ];
        }
      }
    }, {
      loader: 'sass-loader'
    }]
  })
};


// Configure the url rule to process images.
const url_rule = {
  test: /\.(gif)|(png)|(svg)$/,
  use: {
    loader: 'url-loader',
  }
};


// Configure the generation of `bundle.js`.
module.exports = {
  context: path.resolve(__dirname, 'client', 'src'),
  devtool: 'source-map',
  entry: {
    bundle: './index.js',
  },
  module: {
    rules: [
      babel_rule,
      url_rule,
      style_rule,
    ]
  },
  output: {
    filename: 'static/[name].[chunkhash].js',
    path: DIST_ROOT,
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
      verbose: true
    }),
    style_plugin,
    index
  ]
};
