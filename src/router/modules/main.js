export default [
  {
    path: '*',
    redirect: '/404',
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/login',
    name: '_login',
    component: () => import('@/views/login'),
    meta: {
      hideInMenu: true,
      title: '登录'
    }
  }
]
