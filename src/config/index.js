import build from '@/../build'

export default {
  isDev: build.isDev,

  /*
  * 路由根路径
  * */
  routerRoot: build.isDev ? process.env.BASE_URL : '/',

  /*
  * 首页
  * */
  home: 'home'
}
