const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
// const CssNano = require('cssnano');
// const Autoprefixer = require('autoprefixer');
const CssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js'
    },

    output: {
        filename: 'index.js',
        publicPath: '/static/',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: [CssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },

            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'
            },

            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: 'pug-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env']
                //     }
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
            entry: path.join(__dirname, './src/sw.js'),
            excludes: [
                '**/.*',
                '**/*.map'
            ]
        })
    ]
};