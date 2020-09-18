/*
* 验证手机号
* */
export function checkPhone(phone) {
  return /^1[1-9]\d{9}$/.test(phone)
}

/*
* 验证密码强度
* 6-16位，包括至少1个字母，1个数字
* */
export function checkPassword(password) {
  return /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z]).*$/.test(password)
}
