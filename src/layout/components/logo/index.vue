<template>
  <h1 class="logo text-center">
    <Avatar icon="ios-person" :src="img" :size="44" class="logo__img"/>
    <span v-if="!collapsed" class="logo__text line-1">
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
    },
    body: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../var.scss';
  .logo {
    height: $headerHeight+px;
    line-height: $headerHeight+px;
    padding: 0 4px;
    &__img {
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
    }
    &__text {
      max-width: 68%;
      font-size: 20px;
      color: #ffffff;
      display: inline-block;
      vertical-align: middle;
      margin-left: 6px;
    }
  }
</style>
