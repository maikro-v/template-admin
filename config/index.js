const isDev = process.env.NODE_ENV === 'development'
// const target = isDev ? 'http://192.168.0.110:81' : 'http://www.aitelink.com'
const target = 'http://www.aitelink.com'

module.exports = {
  isDev,
  publicPath: isDev ? '/' : 'https://yundian-1300661962.cos.ap-shanghai.myqcloud.com/pc/admin',
  proxy: {
    '/api': {
      target
    }
  }
}
