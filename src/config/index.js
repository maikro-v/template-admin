const isDev = process.env.NODE_ENV === 'development'

export default {
  isDev,

  /*
  * 路由根路径
  * */
  routerRoot: isDev ? process.env.BASE_URL : '/',

  /*
  * 首页
  * */
  home: 'home'
}
