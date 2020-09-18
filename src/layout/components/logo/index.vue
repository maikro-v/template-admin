<template>
  <h1 class="logo row align-center justify-center">
    <Avatar icon="ios-person" :src="img" :size="44"/>
    <span v-if="!collapsed && $slots.default" class="logo__text">
      <slot />
    </span>
  </h1>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../var.scss';
  .logo {
    height: $headerHeight+px;
    line-height: $headerHeight+px;
    &__img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
    }
    &__text {
      font-size: 20px;
      color: #ffffff;
      display: inline-block;
      vertical-align: middle;
      margin-left: 6px;
    }
  }
</style>
