import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import components from '@/components'
import directives from '@/diractives'
import plugins from '@/plugins'
import apis from '@/api'
import '@/iview.less'
import '@/styles/index.scss'
import '@/assets/fonts/iconfont.css' // 字体图标 具体有哪些图标查看src/assets/fonts/demo_index.html

// 注册UI框架
Vue.use(ViewUI)
// 注册api
Vue.use(apis)
// 注册全局组件
Vue.use(components)
// 注册指令
directives(Vue)
// 注册插件
plugins(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
