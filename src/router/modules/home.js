import layout from '@/layout/index.vue'

export default [
  {
    path: '/',
    name: '_home',
    redirect: '/',
    component: layout,
    meta: {
      icon: 'guanliyuan-full',
      hideInMenu: false,
      title: '首页'
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          hideInMenu: false,
          hideBread: false,
          title: '首页',
          account: []
        }
      },
      {
        path: '/',
        name: 'home2',
        component: () => import('@/views/home/index.vue'),
        meta: {
          hideInMenu: false,
          hideBread: false,
          title: '首页',
          account: []
        }
      }
    ]
  }
]
