import drag from './drag'

const install = (Vue) => {
  Vue.directive('drag', drag)
}

if (window.Vue) {
  window.drag = drag
  window.Vue.use(install)
}

drag.install = install
export default drag
