import { Notice } from 'view-design'
import _ from 'lodash'

export function error(options) {
  notice(options, 'error')
}

export function success(options) {
  notice(options, 'success')
}

export function msg(options) {
  notice(options, 'open')
}

export function info(options) {
  notice(options, 'info')
}

function notice(options, type = 'success') {
  const defaultDuration = 1.2
  if (_.isString(options)) {
    Notice[type]({
      title: options
    })
  } else if (_.isObject(options)) {
    Notice[type]({
      title: options.title,
      desc: options.desc,
      duration: options.duration || defaultDuration
    })
    options.success && options.success()
    setTimeout(() => {
      options.callback && options.callback()
    }, defaultDuration * 1000)
  }
}

const install = (Vue) => {
  Vue.prototype.$error = error
  Vue.prototype.$success = success
  Vue.prototype.$msg = msg
  Vue.prototype.$info = info
}

export default {
  install
}
