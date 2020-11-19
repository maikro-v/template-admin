const build = require('./build/index.js')

module.exports = {
  publicPath: build.publicPath,
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
    proxy: build.proxy
  }
}
