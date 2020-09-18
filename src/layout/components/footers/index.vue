<template>
  <div class="layout-footer">
    <img src="@/assets/images/logo.png" alt="会员云店" class="layout-footer__img">
    <span class="layout-footer__text">艾特互联提供技术支持</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .layout-footer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__img {
      height: 34px;
      margin-right: 32px;
    }
    &__text {
      font-size: 15px;
      color: #999999;
      line-height: 1;
    }
  }
</style>
