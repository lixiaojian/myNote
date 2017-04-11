const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        login:[
            './src/js/login.js',
            hotMiddlewareScript
        ],
        userCenter:[
            './src/js/userCenter.js',
            hotMiddlewareScript
        ],
        test:[
            './src/js/test.js',
            hotMiddlewareScript
        ]
    },
    output:{
        filename:'[name]-bundle.js',
        publicPath:'/build/',
        path: __dirname + '/build/'
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                include:[
                    path.resolve(__dirname,'src')
                ],
                use:['react-hot-loader','babel-loader']
            },
            {
                test:/\.css$/,
                use:"style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    { loader:'less-loader', options: {"sourceMap":true,"modifyVars":theme}}
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {loader:'url-loader',options:{limit:8192,name:'images/[hash:8].[name].[ext]'}}
                ]
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.css']
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
        //拷贝文件
        new CopyWebpackPlugin([{
            from: __dirname + '/src',
            to: __dirname + '/build'
        }])
    ]
};