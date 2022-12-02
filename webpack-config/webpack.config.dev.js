'use strict';

const {merge} = require('webpack-merge');
const exampleConfig = require('./webpack.config.example');
const helpers = require('./helpers');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const example = (process.env.EXAMPLE || 'item-list').trim();

module.exports = merge(exampleConfig, {
    mode: 'development',

    devtool: 'eval-cheap-module-source-map',

    output: {
        path: helpers.root('examples/' + example + '/'),
        publicPath: '/',
        filename: 'js/[name].[hash:8].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: helpers.root() + '/examples/public/index.html',
            filename: helpers.root() + `/examples/${example}/index.html`,
            inject: true
        })
    ]
});
