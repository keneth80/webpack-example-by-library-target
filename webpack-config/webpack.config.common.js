const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: {
        app: './src/index.ts'
    },
    output: {
        asyncChunks: true,
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2',
        environment: {
            module: true
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '...']
    },
    devtool: 'inline-source-map',
    devServer: {
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            },
            {
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/plugin-transform-typescript']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: helpers.root(),
            verbose: true
        })
    ]
};
