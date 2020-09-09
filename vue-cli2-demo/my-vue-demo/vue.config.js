
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue的各种测试' // 标题

module.exports = {
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: false,

  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      ['/picww/']: {
        target: `http://192.168.3.200:8089/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/picww/']: ''
        }
      },
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      ['/vedio_1/']: {
        target: `http://yf.ugc.v.cztv.com/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/vedio_1/']: ''
        }
      },
      ['/vedio_2/']: {
        target: `rtmp://live.hkstv.hk.lxdns.com/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/vedio_2/']: ''
        }
      },
      ['/aaaa/']: {
        target: `http://jifen.xiaomy.net/`,
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        //ws: true, // proxy websockets
        pathRewrite: {
          ['^' + '/aaaa/']: ''
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      },
      ['/prod-api/']: {
        target: `http://jifen.xiaomy.net/`,
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        //ws: true, // proxy websockets
        pathRewrite: {
          ['^' + '/prod-api/']: '/prod-api/'
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      },
    },
    disableHostCheck: true
  },

  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single'),
          {
            from: path.resolve(__dirname, './public/robots.txt'),//防爬虫文件
            to: './',//到根目录下
          }
        }
      )
  },


  configureWebpack: config => {

    config.module.rules.push({
      test: /\.swf$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'file/[path][name].[hash:7].[ext]'
        }
      }]
    })
  },
}