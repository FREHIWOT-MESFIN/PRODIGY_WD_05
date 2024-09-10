const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  mode: 'production', 
  entry: './index.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    static: path.resolve(__dirname), 
    open: true, 
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
