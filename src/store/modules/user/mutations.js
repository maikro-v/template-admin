import { removeToken } from '@/utils/utils'

export default {
  setUsername(state, name) {
    state.username = name
  },
  setMobile(state, mobile) {
    state.mobile = mobile
  },
  setHasGetUserInfo(state, data) {
    state.hasGetUserInfo = data
  },
  setHasGetStore(state, data) {
    state.hasGetStore = data
  },
  setShopLogo(state, logo) {
    state.shopLogo = logo
  },
  setShopName(state, shopName) {
    state.shopName = shopName
  },
  setShopUniqid(state, uniqid) {
    state.shopUniqid = uniqid
  },
  setPermission(state, data) {
    state.permission = data
  },
  clearLoginStatus() {
    removeToken()
    this.commit('user/setHasGetUserInfo', false)
  }
}
