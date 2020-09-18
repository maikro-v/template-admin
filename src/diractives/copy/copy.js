/*
* 复制指令
* 使用方法
* v-copy:[这里传入需要复制的值]="这里是回调方法"
* <button v-copy:['被复制的内容']="handleCopySuccess">复制</button>
* handleCopySuccess() {
*   alert('复制成功')
* }
* */
export default {
  inserted(el, { value, arg }) {
    el.$value = arg // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
    el.handler = () => {
      const textarea = document.createElement('textarea')
      textarea.value = el.$value
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将节点插入到body
      document.body.appendChild(textarea)
      // 设置选中范围
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length)
      // 复制
      const result = document.execCommand('Copy')
      if (result) {
        value && value()
      }
      // 移除节点
      document.body.removeChild(textarea)
    }
    // 绑定点击事件
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { arg }) {
    el.$value = arg
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}
