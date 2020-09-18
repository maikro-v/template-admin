import Cookie from 'js-cookie'

const TOKEN_NAME = 'TOKEN'

/*
* 获取token
* */
export function getToken() {
  return Cookie.get(TOKEN_NAME)
}

/*
* 设置token
* */
export function setToken(token) {
  return Cookie.set(TOKEN_NAME, token)
}

/*
* 删除token
* */
export function removeToken() {
  return Cookie.remove(TOKEN_NAME)
}

/*
*  是否拥有访问权限
*  @param { Array } has 所拥有的权限
*  @param { Array } needed 需要的权限
* */
export function hasPermission(has, needed = []) {
  // 不需要任何权限
  if (needed && needed.length === 0) {
    return true
  }
  let result = false
  for (const key in needed) {
    if (has.includes(needed[key])) {
      result = true
      break
    }
  }
  return result
}
