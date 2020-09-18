import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { getToken, hasPermission } from '@/utils/utils'
import config from '@/config'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: config.routerRoot,
  routes
})

const toPage = (to, next) => {
  if (to.meta && (to.meta.account === undefined || to.meta.account.length === 0)) { // 不需要权限，直接进入
    return next()
  }
  // 检测用户有没有访问权限
  if (hasPermission(store.state.user.permission, to.meta.account)) {
    next() // 有访问权限，进入页面
  } else {
    // 没访问权限，重定向到403
    next({
      name: '_403'
    })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title

  const TOKEN = getToken()
  const TO_NAME = to.name
  const LOGIN_PAGE_NAME = 'login'
  const IGNORE_PAGES = ['_404', '_403', 'register'] // 不需要验证的页面，直接跳转进入
  if (IGNORE_PAGES.includes(TO_NAME)) { // 跳转的页面不需要权限
    next()
  } else if (TOKEN && TO_NAME === LOGIN_PAGE_NAME) { // 已登录，跳转的是登录页
    next({
      name: config.home
    })
  } else if (!TOKEN && TO_NAME !== LOGIN_PAGE_NAME) { // 未登录，跳转的不是登录页
    store.commit('user/clearLoginStatus')
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (!TOKEN && to.name === LOGIN_PAGE_NAME) {
    // 未登录，跳转的是登陆页
    store.commit('user/clearLoginStatus')
    next()
  } else {
    if (store.state.user.hasGetUserInfo) {
      toPage(to, next)
    } else {
      store.dispatch('user/getUserInfo').then(() => {
        toPage(to, next)
      }).catch(() => {
        store.dispatch('user/handleLogout')
      })
    }
  }
})

export default router
