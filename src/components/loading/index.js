import loading from './src/index.vue'

const install = (Vue) => {
  // 根据loading组件创建一构造器
  const Loading = Vue.extend(loading)
  // 创建一个loading实例，并挂在到一个空div上
  const instance = new Loading({
    el: document.createElement('div')
  })

  // 指令方式使用
  Vue.directive('loading', {
    bind(el, binding, vnode) {
      // el.style.cssText += ';position: relative;'
    },
    inserted(el, binding, vnode) {
      el.appendChild(instance.$el)
      instance.fix = true
      instance.value = binding.value
    },
    update(el, binding, vnode) {
      instance.value = binding.value
    }
  })
}

export default {
  install
}
