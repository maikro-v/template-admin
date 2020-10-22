import Upload from './upload'
import CustomPage from './custom-page'
import Empty from './empty'
import Cropper from './cropper'
import Loading from './loading'
import Image from './image'

const components = [
  Upload,
  CustomPage,
  Empty,
  Cropper,
  Image
]

const install = (Vue) => {
  components.forEach((ele) => {
    Vue.component(ele.name, ele)
  })
  Vue.use(Loading)
}

/* 兼容cdn方式使用 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* vue.use 使用 */
export default {
  version: '1.0.0',
  install
}
