const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
let proxyDev = {
  '/api/*': {
    target: 'http://localhost:9091'
  }
}
let mockProxy = {
  '/api/*': {
    target: 'http://easymock.rocoinfo.cn/mock/5d5ce42fdc3b4100161bf830/roco_activity_admin'
  }
}
let argv
try {
  argv = JSON.parse(process.env.npm_config_argv).original
} catch(ex) {
  argv = process.argv
}
let proxy = argv[1] === 'mock' ? mockProxy : proxyDev

module.exports = {
  publicPath: process.env.PUBLIC_URL,
  assetsDir: process.env.ASSETS_URL,
  pages: {
    index: {
      entry: 'src/entries/main.js'
    },
  //   login: {
  //     entry: 'src/entries/login.js'
  //   }
  },
  devServer: {
    proxy
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    }
  }
}
