const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_ROOT = path.resolve(__dirname, 'dist');


// Configure the generation of `index.html`.
const index = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'ejs-loader!client/index.ejs',
  title: 'Replicante WebUI'
});


// Configure the generation of `bundle.js`.
module.exports = {
  context: path.resolve(__dirname, 'client', 'src'),
  entry: './index.js',
  output: {
    filename: 'static/bundle.js',
    path: DIST_ROOT,
    publicPath: '/'
  },
  plugins: [
    index
  ]
};
