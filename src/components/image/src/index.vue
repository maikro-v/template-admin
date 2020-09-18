<template>
  <div class="image">
    <img v-if="lazy" v-lazy="`${src}${imageMogr2}`" :alt="alt" :style="_style">
    <img v-else :src="`${src}${imageMogr2}`" :alt="alt" :style="_style">
  </div>
</template>

<script>
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
    imageMogr2() {
      let str = '?imageMogr2'
      if (this.scale) {
        str += `/thumbnail/!${this.scale}p`
      }
      return str
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
