<template>
  <Dropdown transfer transfer-class-name="side-collapsed-submenu" placement="left-start">
    <slot />
    <DropdownMenu slot="list">
      <template v-for="item in list">
        <side-collapsed-submenu v-if="item.children && item.children.length" :list="item.children" :key="`side-collapsed-submenu-${getMeta(item).name}`">
          <div class="side-collapsed-submenu__a">
            <Icon
              v-if="getMeta(item).icon"
              :custom="`iconfont icon-${getMeta(item).icon}`"
              size="18"
              class="side-collapsed-submenu__icon-badge"
            />
            <span class="side-collapsed-submenu__title">{{ getMeta(item).title }}</span>
            <Icon
              type="right"
              size="12"
              class="side-collapsed-submenu__icon-badge"
            />
          </div>
        </side-collapsed-submenu>
        <DropdownItem v-else-if="showMenu(item.meta)" :key="`side-collapsed-submenu-${getMeta(item).name}`">
          <div class="side-collapsed-submenu__a" @click="handleClick(item)">
            <Icon
              v-if="getMeta(item).icon"
              :custom="`iconfont icon-${getMeta(item).icon}`"
              size="14"
              class="side-collapsed-submenu__icon-badge"
            />
            <span class="side-collapsed-submenu__title">{{ getMeta(item).title }}</span>
          </div>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { mapState } from 'vuex'
import { hasPermission } from '@/utils/utils'
export default {
  name: 'side-collapsed-submenu',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapState('user', ['permission'])
  },
  methods: {
    handleClick(route) {
      this.$emit('click', route)
    },
    getMeta(item) {
      return {
        icon: item.meta.icon || '',
        title: item.meta.title || '',
        name: item.name || ''
      }
    },
    showMenu(meta) {
      if (meta.account === undefined) {
        return !meta.hideInMenu
      } else {
        return hasPermission(this.permission, meta.account) && !meta.hideInMenu
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .ivu-dropdown-item {
    padding: 0 !important;
  }
  .side-collapsed-submenu {
    width: 300px;
    &__a {
      position: relative;
      display: block;
      text-align: left;
      padding: 7px 30px 7px 14px;
      cursor: pointer;
      &:hover {
        background-color: #f3f3f3;
      }
    }
    &__title {
      font-size: 14px;
    }
    &__icon-badge {
      margin-right: 6px;
    }
    &__icon-right {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
