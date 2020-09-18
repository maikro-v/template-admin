/**
 * cos 图片处理的简便用法类
 */

class CosImage {
  constructor(url) {
    const spliceText = /\?/.test(url) ? '&' : '?'
    this.url = `${url}${spliceText}imageMogr2`
    return this
  }

  // 图片缩放
  scale(num = 100) {
    this.url += `/thumbnail/!${num}p`
    return this
  }
}

export default function cosImage(url) {
  return new CosImage(url)
}
