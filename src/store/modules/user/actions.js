import router from '@/router'

export default {
  /*
  * 退出登录
  * */
  handleLogout({ commit }) {
    return new Promise(() => {
      // 如果有接口这里调用接口
      commit('clearLoginStatus')
      router.push({
        name: 'login'
      })
    })
  },
  /*
  * 获取用户信息，包括店铺信息
  * */
  getUserInfo({ state, commit }) {
    return new Promise((resolve, reject) => {
      // 这里有接口调用接口
      commit('setHasGetUserInfo', true)
      resolve(state)
    })
  }
}
