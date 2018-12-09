const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js'
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000'
      },

      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/
        // use: {
        // loader: 'babel-loader',
        // options: {
        // presets: ['@babel/preset-env']
        // }
        // }
      }

    ]
  },


  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new ExtractTextPlugin({ 
      filename: 'main.css' 
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './src/js/sw.js')
    })
  ]

};