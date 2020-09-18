<template>
  <header class="layout-navbar">
    <Icon custom="iconfont icon-zhankai" size="20" class="layout-navbar__icon" @click="handleExpand"/>
    <slot name="left" />
    <div class="layout-navbar__container">
      <slot />
    </div>
    <slot name="user" />
  </header>
</template>

<script>
export default {
  methods: {
    handleExpand() {
      this.$emit('expand')
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout-navbar {
    position: relative;
    z-index: 200;
    display: flex;
    align-items: center;
    padding: 0 14px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    &__icon {
      cursor: pointer;
    }
    &__container {
      flex: 1;
    }
  }
</style>
