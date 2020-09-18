<template>
  <span class="side-menu-item">
    <span v-if="icon" class="side-menu-item__icon">
      <Icon :custom="`iconfont icon-${icon}`" size="16"/>
    </span>
    <span class="side-menu-item__title">{{ title }}</span>
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-menu-item__icon {
    margin-right: 10px;
  }
</style>
