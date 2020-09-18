/*
* 拖拽指令
* options 参数
* @param { String } target 需要移动的元素Id
* @param { String } parent 边界限制的Id，一般传父级Id
* */
export default {
  inserted(el, binding) {
    if (binding.value.disable) {
      return false
    }
    const dragDom = document.querySelector(binding.value.target)
    const parentDom = binding.value.parent ? document.querySelector(binding.value.parent) : null

    dragDom.style.cssText += `;position: absolute; left: ${dragDom.offsetLeft}px; top: ${dragDom.offsetTop}px;`
    el.style.cssText += ';cursor:move;'

    el.onmousedown = (e) => {
      e.preventDefault()
      const disX = e.clientX - dragDom.offsetLeft
      const disY = e.clientY - dragDom.offsetTop
      document.onmousemove = (e) => {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界限制
        if (parentDom) {
          left = Math.max(left, 0)
          left = Math.min(left, parentDom.clientWidth - dragDom.clientWidth)
          top = Math.max(top, 0)
          top = Math.min(top, parentDom.clientHeight - dragDom.clientHeight)
        }

        // 移动当前元素
        dragDom.style.cssText += `;left: ${left}px; top: ${top}px;`
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null
      }
    }
  },
  unbind(el) {
    el.onmousedown = null
  }
}
