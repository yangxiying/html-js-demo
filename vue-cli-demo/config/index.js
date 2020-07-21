'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/': {
        target: 'http://425.0.100.100:8888/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,//如果需要跨域
        pathRewrite: {
          '^/api/': '/'
          //这里理解成用的地址，
          // 后面组件中我们掉接口时直接用api代替 比如我要调
          // 用'http://425.0.100.100:8888/user/add'，直接写‘/api/user/add’即可
        }
      },
      '/yxy/': {
        target: 'http://localhost:10001/',
        changeOrigin: true,//如果需要跨域
        pathRewrite: {
          '^/yxy': '/'
        }
      },
      '/yxypost/': {
        target: 'http://localhost:8088/',
        changeOrigin: true,//如果需要跨域
        pathRewrite: {
          '^/yxypost/': '/'
        }
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { 
      '/yxy': {
        target: 'http://192.168.3.126:10001/',
        changeOrigin: true,//如果需要跨域
        pathRewrite: {
          '^/yxy': '/'
        }
      },
    },
    /* 
     * Source Maps
     * true代表打包环境是开发环境，可以进行调试；false表示生产环境，正式上线的
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
