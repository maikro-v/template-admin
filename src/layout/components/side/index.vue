<template>
  <div class="layout-side">
    <slot name="logo" />
    <Menu
      v-show="!collapsed"
      ref="menu"
      :active-name="activeName"
      :open-names="openNames"
      :accordion="accordion"
      width="auto"
      theme="dark"
    >
      <side-menu v-for="item in routes" :key="`menu-${item.name}`" :item="item"/>
    </Menu>
    <div v-show="collapsed" class="collapsed-menu">
      <side-collapsed-menu
        v-for="item in routes"
        :key="`drop-menu-${item.name}`"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import sideMenu from './side-menu.vue'
import sideCollapsedMenu from './side-collapsed-menu.vue'
export default {
  components: {
    sideMenu,
    sideCollapsedMenu
  },
  props: {
    activeName: {
      type: String,
      default: ''
    },
    accordion: {
      type: Boolean,
      default: true
    },
    routes: {
      type: Array,
      default() {
        return []
      }
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 展开项
      openNames: []
    }
  },
  computed: {
    menu() {
      return this.$refs.menu
    }
  },
  watch: {
    activeName(name) {
      if (this.accordion) this.openNames = this.getOpenedNamesByActiveName(name)
      else this.openNames = this.getUnion(this.openNames, this.getOpenedNamesByActiveName(name))
    },
    openNames() {
      this.$nextTick(() => {
        this.menu.updateOpened()
        this.menu.updateActiveName()
      })
    }
  },
  mounted() {
    this.openNames = this.getUnion(this.openNames, this.getOpenedNamesByActiveName())
  },
  methods: {
    /**
     * @param {Array} arr1
     * @param {Array} arr2
     * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
     */
    getUnion(arr1, arr2) {
      return Array.from(new Set([...arr1, ...arr2]))
    },
    // 根据选中名称获取菜单栏展开项
    getOpenedNamesByActiveName(name) {
      // const names: string[] = []
      let names = this.$route.matched.map(item => item.name)
      if (names && names.length) {
        names = names.filter(item => item !== name)
      } else {
        names = []
      }
      return names
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../var.scss';
  .layout-side {
    position: relative;
    z-index: 1;
    height: 100%;
    background: $asideBackground;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  }

  /* 初始化ui框架样式 */
  /deep/ .ivu-menu-dark {
    background: transparent;
  }
  /deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: $asideBackground;
  }
  /deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: $asideBackground;
  }
  /deep/ .ivu-menu-item {
    font-size: 15px;
  }
  /deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover,
  /deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    background: white !important;
    color: #ff7008;
  }
</style>
