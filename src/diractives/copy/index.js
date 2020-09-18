import copy from './copy'

const install = (Vue) => {
  Vue.directive('copy', copy)
}

if (window.Vue) {
  window.copy = copy
  window.Vue.use(install)
}

copy.install = install
export default copy
