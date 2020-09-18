import _ from 'lodash'
import dayjs from 'dayjs'
import Storage from '@/utils/Storage'
import msg from './modules/msg'
import lazyload from './modules/lazyload/lazyload'

export default (Vue) => {
  Vue.use(msg)
  Vue.prototype.$_ = _
  Vue.prototype.$dayjs = dayjs
  Vue.prototype.$storage = Storage
  Vue.use(lazyload)
}
