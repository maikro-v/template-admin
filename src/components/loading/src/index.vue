<template>
  <Spin v-if="_value" :fix="fix">
    <Icon type="ios-loading" size=18 class="spin-icon-load" />
    <div>Loading</div>
  </Spin>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    fix: {
      type: Boolean,
      default: false
    },
    type: {}
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(val) {
        this.value = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
