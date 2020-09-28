<template>
  <div v-show="_value" class="image-cropper">
    <div class="mask" />
    <div class="image-cropper-wrap">
      <div class="image-cropper-header row align-center">
        <div class="col">
          <h2 class="image-cropper-header__title">
            图片裁剪
          </h2>
          <span class="image-cropper-header__tip">滚动鼠标滚轮更改图片大小</span>
        </div>
        <button type="button" class="image-cropper-header__btn" @click="cancel">
          取消
        </button>
        <button type="button" class="image-cropper-header__btn image-cropper-header__btn_primary" @click="confirm">
          保存
        </button>
      </div>
      <div class="image-cropper-body clear">
        <div class="image-cropper-origin">
          <vue-cropper
            :ref="ref"
            :img="img"
            :enlarge="enlarge"
            :auto-crop="true"
            :fixed-box="true"
            :info="false"
            :can-move-box="false"
            :auto-crop-width="cropWidth"
            :auto-crop-height="cropHeight"
            output-type="png"
            @realTime="realTime"
          />
        </div>
        <div class="image-cropper-preview">
          <div :style="previewStyle" class="image-cropper-preview__img">
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'cropper',
  components: {
    VueCropper
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: ''
    },
    cropWidth: {
      type: Number,
      default: 200
    },
    cropHeight: {
      type: Number,
      default: 200
    },
    enlarge: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      ref: `image-cropper-${(new Date().getTime() + Math.random() * 10000).toFixed(0)}`,
      previews: {},
      previewStyle: {
        width: `${this.cropWidth}px`,
        height: `${this.cropHeight}px`,
        overflow: 'hidden',
        margin: '0',
        zoom: 1
      }
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    realTime(data) {
      const previews = data
      this.previewStyle = {
        width: `${previews.w}px`,
        height: `${previews.h}px`,
        overflow: 'hidden',
        margin: '0',
        zoom: 1
      }
      this.previews = data
    },
    confirm() {
      this.$refs[this.ref].getCropData((data) => {
        this.$emit('confirm', data)
        this._value = false
      })
    },
    cancel() {
      this.$emit('cancel')
      this._value = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin mosaic {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC") repeat left top / 16px;
  }
  .image-cropper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 600;
    pointer-events: none;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 590;
    background: rgba(0, 0, 0, .6);
    pointer-events: auto;
  }
  .image-cropper-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    min-width: 700px;
    max-width: 1100px;
    z-index: 591;
    background: white;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    overflow: hidden;
  }
  .image-cropper-header {
    border-bottom: 1px solid #dddddd;
    &__title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 20px;
      display: inline-block;
    }
    &__tip {
      font-size: 14px;
      /*color: #999999;*/
      color: var(--primary);
      display: inline-block;
      margin-left: 18px;
    }
    &__btn {
      min-width: 100px;
      height: 60px;
      font-weight: normal;
      border: 0;
      border-left: 1px solid #e4e4e4;
      background: transparent;
      font-size: 16px;
      cursor: pointer;
      transition: opacity .3s ease;
      outline: none;
      &_primary {
        background: var(--primary);
        color: white;
      }
      &:hover {
        opacity: .8;
      }
    }
  }
  .image-cropper-body {
    height: 500px;
    @include mosaic;
    &::before {
      content: '';
      clear: both;
      height: 0;
      display: inline-block;
    }
  }
  .image-cropper-origin,
  .image-cropper-preview {
    position: relative;
    height: 100%;
    width: 50%;
    overflow: hidden;
    float: left;
  }
  .image-cropper-preview {
    width: 50%;
    border-left: 4px solid #999999;
    background: rgba(0, 0, 0, .5);
    &__img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 90%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 4px rgba(255, 255, 255, .4);
      @include mosaic;
    }
  }
</style>
