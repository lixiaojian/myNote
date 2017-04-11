/**
 * Created by xiaojianli on 2017/3/6.
 */

var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/js/root'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({//混合代码插件
            compressor: {
                warnings: false
            }
        }),
        new CleanWebpackPlugin(['build'],
            {
                // root:'/full/project/path',
                verbose: true,
                dry: false
            }
        )
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.(png|jpg)$/,loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'}
        ]
    }
};