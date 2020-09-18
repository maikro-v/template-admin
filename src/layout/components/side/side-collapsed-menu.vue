<template>
  <div v-if="showMenu(item.meta)" class="side-collapsed-menu">
    <template v-if="hasOneShowingChild(children)">
      <side-collapsed-submenu :list="children" @click="handleToPage">
        <a class="side-collapsed-menu__a">
          <Icon :custom="`iconfont icon-${meta.icon}`" size="18"/>
        </a>
      </side-collapsed-submenu>
    </template>
    <template v-else>
      <Tooltip
        :content="meta.title"
        transfer
        placement="right"
      >
        <a class="side-collapsed-menu__a" @click="handleToPage(item)">
          <Icon :custom="`iconfont icon-${meta.icon}`" size="18"/>
        </a>
      </Tooltip>
    </template>
  </div>
</template>

<script>
import menuMixins from './menuMixins'
import sideCollapsedSubmenu from './side-collapsed-submenu.vue'
export default {
  name: 'side-collapsed-menu',
  mixins: [menuMixins],
  components: {
    sideCollapsedSubmenu
  },
  data() {
    return {
    }
  },
  methods: {
    handleToPage(route) {
      this.$router.push({
        name: route.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-collapsed-menu {
    &__a {
      width: var(--asideWidth, 64px);
      display: block;
      text-align: center;
      padding: 14px 10px;
      color: #ffffff;
    }
  }
</style>
