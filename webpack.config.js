var webpack = require('webpack');
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js','.json','.web.js','.mjs'],
  },
};
