<template>
  <div class="bread-nav">
<!--    <span class="bread-nav-item bread-nav__root">当前位置: </span>-->
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in breads">
        <span
          :key="`bread-${item.name}`"
          class="bread-nav-item"
          :class="{
            'bread-nav-item_disable': index === breads.length - 1
          }"
          @click="index < breads.length - 1 && to(item)"
        >
          {{ item.meta.title }}
        </span>
        <span v-if="index < breads.length - 1" :key="`bread-separator-${item.name}`" class="bread-nav-item bread-nav__separator">/</span>
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      breads: []
    }
  },
  created() {
    this.getRoutes()
  },
  watch: {
    $route() {
      this.getRoutes()
    }
  },
  methods: {
    getRoutes() {
      const matched = this.$route.matched || []
      this.breads = matched.filter(ele => !ele.meta.hideBread)
    },
    to(row) {
      if (this.$route.name === row.name) {
        return
      }
      this.$router.push({
        name: row.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bread-nav {
    &::before {
      content: '';
      display: inline-block;
      height: 0;
      clear: both;
    }
    &-item {
      float: left;
      font-size: 16px;
      color: #333333;
      cursor: pointer;
      &:hover {
        color: var(--primary, #ff780a);
      }
      &_disable {
        color: #999999;
        &:hover {
          color: #999999;
          cursor: text;
        }
      }
    }
    &__root {
      color: #333333;
      font-weight: bold;
      margin-right: 6px;
    }
    &__separator {
      color: #999999;
      margin: 0 4px;
    }
  }
</style>
