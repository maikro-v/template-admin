<template>
  <div class="image">
    <img v-if="lazy" v-lazy="_src" :alt="alt" :style="_style">
    <img v-else :src="_src" :alt="alt" :style="_style">
  </div>
</template>

<script>
import CosImage from '@/utils/CosImage'
export default {
  name: 'v-image',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    },
    scale: {
      type: [String, Number],
      default: '100'
    },
    mode: {
      type: String,
      default: 'fill'
    }
  },
  computed: {
    _src() {
      return new CosImage(this.src).scale(this.scale).end()
    },
    _style() {
      return {
        'object-fit': this.mode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    display: inline-block;
    & img {
      width: 100%;
      height: 100%;
      display: block;
      object-position: center;
    }
  }
</style>
