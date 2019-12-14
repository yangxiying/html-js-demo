const path = require('path');
// 为了能够访问index.html 文件和把打包后的文件注入到主index.html文件中我们需要安装html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
// vueloader用来编译 .vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: './index.js'
    },
    resolve:{
        alias:{ //设置别名，类unix
            'vue':"vue/dist/vue.esm.js"
        }
    },
    // webpack-dev-server
    devServer: {
        index: "index.html",
        publicPath: "/",
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ],
    module:{
        rules:[
            {
                test: /\.vue$/,
                use:["vue-loader"]
            }
        ],
    },
};