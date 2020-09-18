import * as example from './example'

const install = (Vue) => {
  Vue.prototype.$api = {
    example
  }
}

export default {
  install
}
