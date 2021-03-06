const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const extractSASS = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            './src/static/css/main.sass',
            './src/js/main.js'
        ]
    },

    output: {
        filename: 'index.js',
        publicPath: '/static/',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.sass$/,
                use: extractSASS.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
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
            }

        ]
    },
    plugins: [
        extractSASS,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
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