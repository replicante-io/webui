const path = require('path');
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
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
};


// Configure SASS as described by bootsrap 4:
//    https://getbootstrap.com/docs/4.0/getting-started/webpack/#importing-precompiled-sass
const sass_rule = {
  test: /\.(scss)$/,
  use: [{
    loader: 'style-loader'
  }, {
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
};


// Configure the generation of `bundle.js`.
module.exports = {
  context: path.resolve(__dirname, 'client', 'src'),
  devtool: 'source-map',
  entry: './index.js',
  module: {
    rules: [
      babel_rule,
      sass_rule
    ]
  },
  output: {
    filename: 'static/bundle.js',
    path: DIST_ROOT,
    publicPath: '/'
  },
  plugins: [
    index
  ]
};
