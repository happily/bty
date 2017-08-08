/**
 *  Author: harry.lang
 *  Date: 17/4/14
 *  Description: Created by harrylang on 17/4/14.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin; //提取公共库
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var CW_NODE_ENV = process.env.CW_NODE_ENV;

var config = {
    entry: {
        'cloudmonitor': path.resolve(__dirname, 'src/cloudMonitor/index.js'),
        'realtime': path.resolve(__dirname, 'src/realtime/index.js'),
        'cloud_monitor': path.resolve(__dirname, 'src/cloud_monitor/index.js'),
        'network': path.resolve(__dirname, 'src/network/index.js'),

        'vender': [
            'react',
            'react-dom',
            'babel-polyfill',
            'echarts',
            'antd',
            'jquery'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].js',
        publicPath: 'static/'
    },
    resolve: {
        alias: {
            'SRC_PATH': __dirname + '/src',
            'GEO_PATH': __dirname + '/src/mapGeo'
        },
        modules: ['node_modules', 'src']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                test: /\.js?$/,
                query: {
                    presets: [
                        'es2015', // 编译ES6
                        'react',    //编译jsx
                        'stage-0'   //ES7一些提案的支持
                    ],
                    plugins: []
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?minimize!less-loader'
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&publicPath=./&outputPath=img/' //  <= 8kb的图片base64内联
            }
        ]
    },
    plugins: [
        //第一个参数vender和entry中vender名称对应，第二个参数是输出的文件名称
        new CommonsChunkPlugin({
            name: 'vender',
            filename: '[name].js'
        }),
        new ExtractTextPlugin({
            filename: 'main.css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(CW_NODE_ENV || 'development') // production
        }),
        //需要暴露到全局使用的vendor列表
        new webpack.ProvidePlugin({
            ReactDOM: "react-dom",
            React: "react",
            _: "lodash",
            echarts: "echarts",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        })
    ]
};

if (CW_NODE_ENV == 'production') {
    config.plugins.push(
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
} else {
    config.entry.test = path.resolve(__dirname, 'src/test/index.js');
}

module.exports = config;