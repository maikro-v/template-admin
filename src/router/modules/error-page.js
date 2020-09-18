export default [
  {
    path: '/404',
    name: '_404',
    component: () => import('@/views/error-page/404/index.vue'),
    meta: {
      hideInMenu: true,
      title: '未找到页面'
    }
  },
  {
    path: '/403',
    name: '_403',
    component: () => import('@/views/error-page/403/index.vue'),
    meta: {
      hideInMenu: true,
      title: '无权限访问'
    }
  }
]
