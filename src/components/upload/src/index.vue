<template>
  <div class="row row-wrap">
    <template v-if="showList">
      <div class="upload__img" :style="_size" v-for="(item, index) in _img" :key="index">
        <div class="upload__handle">
          <Icon type="md-trash" class="upload__handle_icon" color="#ffffff" :size="30" @click="remove(index)"/>
        </div>
        <div class="upload__img_view" :style="toBackground(item)"></div>
      </div>
    </template>
    <Upload
      v-show="_showUpload"
      :ref="ref"
      name="files"
      :disabled="uploadLoading"
      :action="uploadApi"
      :max-size="maxSize"
      :show-upload-list="false"
      :format="formatImage"
      accept=".jpg,.jpeg,.png"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="handleUploadError"
      :on-exceeded-size="() => handleUploadSize(maxSize)"
    >
      <div class="upload" :style="_size">
        <Spin fix v-if="uploadLoading">
          <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" />
            </svg>
          </div>
        </Spin>
        <template v-else>
          <slot v-if="$slots.default" />
          <Icon v-else type="ios-add" class="upload__icon" :size="30"/>
        </template>
      </div>
    </Upload>
    <!-- 裁剪框 -->
    <image-cropper
      v-model="showCropper"
      :img="previewImg"
      :crop-width="cropWidth"
      :crop-height="cropHeight"
      :enlarge="enlarge"
      @confirm="cropperConfirm"
      @cancel="cropperCancel"
    />
  </div>
</template>

<script>
import CosImage from '@/utils/CosImage'

export default {
  name: 'upload',
  props: {
    value: {
      type: [Array, String],
      required: true
    },
    uploadApi: {
      type: String,
      default: ''
    },
    listSize: {
      type: Number,
      default: 9999
    },
    maxSize: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    showList: {
      type: Boolean,
      default: true
    },
    crop: {
      type: Boolean,
      default: false
    },
    cropWidth: {
      type: Number,
      default: 300
    },
    cropHeight: {
      type: Number,
      default: 300
    },
    enlarge: {
      type: Number,
      default: 2
    },
    scale: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      uploadLoading: false,
      formatImage: ['jpg', 'jpeg', 'png'],
      showCropper: false,
      previewImg: '',
      ref: `upload-${(new Date().getTime() + Math.random() * 1000).toFixed(0)}`
    }
  },
  computed: {
    _size() {
      return `width: ${this.width}; height: ${this.height}; line-height: ${this.height}`
    },
    _showUpload() {
      return this._img.length < this.listSize
    },
    _img() {
      if (!this.value) {
        // 如果不存在返回空数组
        return []
      } else if (typeof this.value === 'string') {
        // 如果是字符串，转换成数组
        return [this.value]
      } else {
        return this.value
      }
    }
  },
  methods: {
    /* 确认裁剪 */
    cropperConfirm(data) {
      this.$refs[this.ref].clearFiles()
      this.$api.tools.uploadAndBase({
        base64: data
      }).then((res) => {
        this.uploadSuccess(res)
      }).catch((err) => {
        this.handleUploadError(err)
      })
    },
    /* 取消裁剪 */
    cropperCancel() {
      this.uploadLoading = false
      this.previewImg = ''
      this.$refs[this.ref].clearFiles()
    },
    beforeUpload(file) {
      if (!this.crop) {
        return true
      }
      this.uploadLoading = true
      if (!this.exceededSize(file, this.maxSize)) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.previewImg = reader.result
          this.showCropper = true
        }
      }
      return false
    },
    uploadSuccess(response) {
      this.uploadLoading = false
      this.$emit('on-success', response)
    },
    remove(index) {
      this.$emit('on-remove', index)
    },
    handleUploadError(err) {
      this.uploadLoading = false
      this.$Message.error(`上传失败！: ${err}`)
    },
    exceededSize(file, maxSize) {
      const size = file.size / 1000
      if (size > maxSize) {
        this.handleUploadSize(maxSize)
      }
      return size > maxSize
    },
    handleUploadSize(size) {
      this.$Message.error(`上传失败，最大不能超过${size / 1000}M！`)
      this.uploadLoading = false
    },
    toBackground(img) {
      return `background: url(${new CosImage(img).scale(this.scale).url}) no-repeat center / contain`
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin upload {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    position: relative;
    cursor: pointer;
    color: #666666;
    overflow: hidden;
  }
  .upload {
    @include upload;
    border: 1px dashed #666666;
    transition: all .2s ease;
    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
    &__img {
      @include upload;
      &_view {
        width: 100%;
        height: 100%;
      }
      &:hover {
        & .upload__handle {
          opacity: 1;
        }
      }
    }
    &__handle {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      opacity: 0;
      transition: all .2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      &_icon {
        cursor: pointer;
      }
    }
  }
  .loader {
    width: 30px;
    height: 30px;
    & .circular {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      margin: auto;
      animation: rotate 2s linear infinite;
      transform-origin: center center;
    }
    & .path {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
      stroke-linecap: round;
    }
  }
  @keyframes rotate {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
  @keyframes color {
    0%, 100% {
      stroke: #d62d20;
    }
    40% {
      stroke: #0057e7;
    }
    66% {
      stroke: #008744;
    }
    80%, 90% {
      stroke: #ffa700;
    }
  }
</style>
