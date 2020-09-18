<template>
  <div class="empty">
    <slot>暂无数据</slot>
  </div>
</template>

<script>
export default {
  name: 'empty'
}
</script>

<style lang="scss" scoped>
  .empty {
    padding: 100px 0;
    text-align: center;
    font-size: 22px;
    color: #c0c0c0
  }
</style>
