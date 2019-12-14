const path = require('path');
// 为了能够访问index.html 文件和把打包后的文件注入到主index.html文件中我们需要安装html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: './index.js'
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
    ]
};