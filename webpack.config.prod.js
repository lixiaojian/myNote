/**
 * Created by xiaojianli on 2017/3/6.
 */

var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fs = require('fs');
const existsSync = fs.existsSync;

const pkgPath = path.join(__dirname, 'package.json');
const pkg = existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    if (cfgPath.charAt(0) === '.') {
        cfgPath = path.resolve(__dirname, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}

module.exports = {
    //devtool: 'source-map',
    entry: [
        './resume/scripts/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build/'),
        publicPath:'/build/',
        filename: 'js/app.js'
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
        ),
        //css单独打包
        new ExtractTextPlugin("css/style.css")
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'resume')
            },
            { test: /\.css$/, use: ["style-loader","css-loader"]},
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([
                    'css-loader',
                    'postcss-loader',
                    { loader:'less-loader', options: {"sourceMap":true,"modifyVars":theme}}
                ])
            },
            // {test: /\.(jpe?g|png|gif|svg)$/i,loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'},
            {test: /\.(jpe?g|png)$/i,loaders: ['url-loader','file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',{loader:"image-webpack-loader",query: {optimizationLevel :7,interlaced: false}}]},
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    }
};