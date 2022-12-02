'use strict';
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const resourceRegExp = /^\.\/locale$/;
const contextRegExp = /moment$/;

module.exports = merge(commonConfig, {
    mode: 'production',

    optimization: {
        noEmitOnErrors: true,
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: {drop_console: true},
                    output: {comments: true}
                }
            })
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // 분석결과를 파일로 저장
            reportFilename: 'report/stats.html', // 분설결과 파일을 저장할 경로와 파일명 지정
            defaultSizes: 'parsed',
            openAnalyzer: false, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
            generateStatsFile: true, // 웹팩 stats.json 파일 자동생성
            statsFilename: 'report/stats.json' // stats.json 파일명 rename
        }),
        new webpack.IgnorePlugin({resourceRegExp, contextRegExp})
    ]
});
