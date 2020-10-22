import { mapState } from 'vuex'
import { hasPermission } from '@/utils/utils'

export default {
  props: {
    item: {
      type: Object,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapState('user', ['permission']),
    meta() {
      const routes = this.children || []
      if (routes && routes.length === 1) {
        return this.getMeta(routes[0])
      } else {
        return this.getMeta(this.item)
      }
    },
    children() {
      const newChildren = []
      const children = this.item.children || []
      children.forEach(el => {
        if (this.showMenu(el.meta)) {
          newChildren.push(el)
        }
      })
      return newChildren
    }
  },
  methods: {
    getMeta(item) {
      const meta = item.meta || {}
      return {
        title: meta.title,
        name: item.name || '',
        icon: meta.icon || ''
      }
    },
    showMenu(meta = {}) {
      // return !meta.hideInMenu
      if (meta.account === undefined || meta.account.length === 0) {
        return !meta.hideInMenu
      } else {
        return hasPermission(this.permission, meta.account) && !meta.hideInMenu
      }
    },
    /**
     * 有无下级路由
     * @param children 下级路由
     * @returns {boolean}
     */
    hasOneShowingChild(children = []) {
      // filter hideInMenu is not true
      // 获取没有隐藏菜单（hideInMenu !== true）的路由
      const routers = children.filter(item => {
        return this.showMenu(item.meta)
      })
      return routers.length > 1
    }
  }
}
