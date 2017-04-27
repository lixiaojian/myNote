/**
 * Created by xiaojianli on 2017/3/6.
 */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
    entry:{
        resume1:[
            './app/resume1/scripts/index.js'
        ],
        resume2:[
            './app/resume2/scripts/index.js'
        ],
        index:[
            './app/index/scripts/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'build/'),
        publicPath:'/build/',
        filename: 'js/[name].js'
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
        new ExtractTextPlugin("css/[name].css"),
        //css压缩
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'app')
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
            {
                test:/\.(woff|svg|eot|ttf)$/,
                use:[{
                    loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png)$/i,
                loaders: ['url-loader?limit=8192&name=images/[hash].[ext]',{
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '60-80',
                                speed: 3,
                            }
                        }
                    }
                ],
                exclude: /node_modules/,
                include: path.join(__dirname, 'app')
            },

            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.css'],
        alias: {
            'jquery': path.resolve(__dirname, 'vendor/jquery/jquery-1.11.3.min.js')
        }
    }
};