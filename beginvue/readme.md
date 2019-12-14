
> 参考：         
[从零开始基于webpack4 babel8搭建vue开发环境](https://www.jianshu.com/p/2a8e309740be)

1. 首先我们创建一个空文件夹，beginvue
2. 文件夹下，执行npm init，初始化package.json文件，一路enter选择默认
3. 创建index .js文件作为入口文件
---

1. 安装搭建vue环境必要的包，，webpack包，webpack-cli包，vue包，vue-loader包

```npm
npm install webpack@^4.0.0 webpack-cli@^3.0.0 vue-loader@^15.0.0 --save-dev
npm install vue@^2.0.0 --save
```

1. 创建entry.js作为配置文件
1. 在 `package.json` 中加入script脚本方便使用，`"dev": "webpack --config entry.js"`
2. 配置文件entry.js 
```js
const path = require('path');

module.exports = {
  entry: {
      main:'./index.js'
    },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
1. 执行`npm run dev` 可以看到打包成功
2. vue js开发环境需要nodejs的本地服务来提供本地访问和热更新，所以这时我们需要安装webpack-dev-server包来启动本地服务
```npm
npm install webpack-dev-server@^3.0.0 --save-dev
```
3. 修改package.json中的run脚本，修改为webpack-dev-server启动，
 - 并加上一些参数 `--port` 端口，`--open` 自动打开浏览器，
 - `--inline`启动内联模式,`--host socket`设置，哪些ip能够访问0.0.0.0表示哪里都可以，
 - --hot 表示启动热更新
```npm
-  "dev": "webpack --config entry.js"
+   "dev": "webpack-dev-server --inline --open --port 8080 --host 0.0.0.0 --hot --config entry.js"

```
1. 另外一些配置我们写到entry.js配置文件的devServer的配置项上
```js
const path = require('path');

module.exports = {
    entry: {
        main:'./index.js'
    },
    // webpack-dev-server 
    devServer:{
        index:"index.html",
        publicPath: "/",
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};
```
1. 建一个index.html文件
```js ```
1. 这里可以配置许多选项，具体可查看文档，现在只需配置publicPath，这个路径下的文件可以在浏览器被访问到，index,这个配置的是访问本地服务地址默认的访问文件
   为了能够访问index.html 文件和把打包后的文件注入到主index.html文件中我们需要安装html-webpack-plugin，
```npm
npm install html-webpack-plugin@^3.0.0 --save-dev
```
2. 配置 entry.js 的相关插件内容
```js
// 插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 在插件中配置
plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', //生成文件路径及路径名
            template: 'index.html', //生成html文件使用的模版
            inject: true //配置打包生成的js文件插入的位置，默认是body里，可以配置到head标签里等，但是vue中需要在body中，因为有对#app dom的获取，所以应该在dom下
        }),
    ]
```

---

1. 编写vue入口文件index.js
```js
import Vue from "vue";

new Vue({
    data(){
        return{
            text:"yangxya-vue-demo",
        }
    },
    el:"#app",
    render:(c)=>c("h2","1223212321312123123")
})
```
2. 执行npm run dev，浏览器自动启动
