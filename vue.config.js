const config = require('./config/index.js')

module.exports = {
  publicPath: config.publicPath,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      scss: {
        prependData: `
          @import "~@/styles/media.scss";
          @import "~@/styles/theme.scss";
        `
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: config.proxy
  }
}
