import axios from 'axios'
import store from '@/store'
import { Notice } from 'view-design'
/*
* 使用CancelToken处理一个请求失效取消后面所有请求的操作
* http://www.axios-js.com/zh-cn/docs/#%E5%8F%96%E6%B6%88
* */
// const CancelToken = axios.CancelToken
// const source = CancelToken.source()

const instance = axios.create({
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  // config.cancelToken = source.token // 全局添加cancelToken
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(({ data }) => {
  if (data.status === 200) {
    return data.data
  } else if (data.status === 401) { // 401登录失效，需要重新登录
    // source.cancel() // 取消其他正在进行的请求
    Notice.info({
      title: '登录失效'
    })
    store.dispatch('user/handleLogout')
  } else {
    return Promise.reject(data.msg)
  }
}, (error) => {
  if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
    return new Promise(() => {})
  } else {
    return Promise.reject(error)
  }
})

export default instance
