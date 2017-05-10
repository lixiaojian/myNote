const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

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
    context: path.join(__dirname),
    devtool:'cheap-module-eval-source-map',
    entry:{
        resume1:[
            './app/resume1/scripts/index.js',
            hotMiddlewareScript
        ],
        resume2:[
            './app/resume2/scripts/index.js',
            hotMiddlewareScript
        ],
        index:[
            './app/index/scripts/index.js',
            hotMiddlewareScript
        ]
    },
    output:{
        filename:'[name].js',
        publicPath:'/build/js/',
        path: __dirname + '/build/js/'
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                include:[
                    path.resolve(__dirname,'app')
                ],
                use:['react-hot-loader','babel-loader']
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.(woff|svg|eot|ttf)$/,
                use:[{
                    loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
                }]

            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    { loader:'css-loader', options: {"sourceMap":true}},
                    'postcss-loader',
                    { loader:'less-loader', options: {"sourceMap":true,"modifyVars":theme}}
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {loader:'url-loader',options:{limit:8192,name:'images/[hash].[ext]'}}
                ]
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
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV),
            __DEV__:true
        }),
        //遇到编译错误不停止服务
        new webpack.NoEmitOnErrorsPlugin(),
        //热启动
        new webpack.HotModuleReplacementPlugin(),
        //css单独打包
        new ExtractTextPlugin("/build/css/style.css"),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};