const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');
const example = (process.env.EXAMPLE || 'item-list').trim();
const TerserPlugin = require('terser-webpack-plugin');
const mode = (process.env.MODE || 'development').trim();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const isHtml = (process.env.IS_HTML || 'N').trim();
const service = (process.env.SERVICE || '').trim();

const proxy = {};

if (service === 'api') {
    Object.assign(proxy, {
        '/api': {
            target: process.env.APP_API_BASE_URL,
            changeOrigin: true,
        },
    });
}

module.exports = {
    entry: {
        example: `./public/${example}.ts`
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        proxy,
    },
    output: {
        path: helpers.root(`examples/${example}`),
        publicPath: `/`,
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    optimization: {
        minimize: true,
        minimizer:
            mode === 'development'
                ? []
                : [
                      new TerserPlugin({
                          terserOptions: {
                              ecma: 6,
                              compress: {drop_console: true},
                              output: {comments: true}
                          }
                      })
                  ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
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
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: helpers.root() + '/examples/' + example,
            cleanOnceBeforeBuildPatterns: ['*.js']
        }),
        new HtmlWebPackPlugin({
            inject: true,
            title: example,
            template: helpers.root() + `/public/index.html`,
            filename: helpers.root() + `/examples/${example}/index.html`
        }),
        new MiniCssExtractPlugin({filename: 'styles.css'}),
        new FaviconsWebpackPlugin(`${helpers.root()}/src/favicon.ico`)
    ]
};
