<template>
  <div class="upload-container">
    <Button :style="{background:color, borderColor:color}" icon="ios-cloud-upload" type="primary" @click=" dialogVisible=true">
      上传
      <!-- upload看他们要什么 -->
    </Button>
    <Modal
      v-model="dialogVisible"
      footer-hide>
      <div class="upload">
        <div class="upload__preview">
          <draggable
            v-model="fileList"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <div class="list" v-for="img in fileList" :key="img.id" v-loading="img.loading">
                <v-image v-show="img.url" :src="img.url" scale="10" mode="contain" class="list__img" />
                <div class="list__handle">
                  <Icon type="md-trash" color="white" size="24" class="list__icon" @click="handleRemove(img.id)"/>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <Upload
          multiple
          :ref="uploadRef"
          type="drag"
          name="files"
          :max-size="uploadMaxSize"
          :action="action"
          accept=".jpg,.jpeg,.png"
          :format="['jpg','jpeg','png']"
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
          :on-progress="handleProgress"
          :on-success="handleSuccess"
          :on-exceeded-size="() => handleExceededSize(uploadMaxSize)"
        >
          <div style="padding: 30px 0;">
            <Icon type="ios-cloud-upload" size="52"></Icon>
            <p>点击或拖动文件到这里上传</p>
          </div>
        </Upload>
      </div>
      <footer class="footer">
        <Button @click="dialogVisible = false" class="footer__btn">
          取消
        </Button>
        <Button type="primary" @click="handleSubmit" class="footer__btn">
          确认
        </Button>
      </footer>
    </Modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'EditorSlideUpload',
  components: { draggable },
  props: {
    color: {
      type: String,
      default: '#ff9030'
    },
    action: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      drag: false,
      listObj: {},
      fileList: [],
      uploadRef: `upload-${this.randomId()}`,
      uploadMaxSize: 2048
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  watch: {
    listObj: {
      handler() {
        this.fileList = []
        for (const key in this.listObj) {
          this.fileList.push(this.listObj[key])
        }
      },
      deep: true
    }
  },
  methods: {
    randomId() {
      return `${(new Date().getTime() + Math.random() * 1000).toFixed(0)}`
    },
    handleProgress(event, file) {
      console.log(`progress：${file.uid}`)
      this.fileList.push({
        id: file.uid,
        url: '',
        loading: true
      })
      // 以uid为key值的object格式更好处理，但会增加拖拽排序的复杂度，所以不建议使用
      // this.$set(this.listObj, file.uid, {
      //   id: file.uid,
      //   url: '',
      //   loading: true
      // })
    },
    handleSuccess(response, file) {
      console.log(`success：${file.uid}`)
      const index = this.fileList.findIndex(el => el.id === file.uid)
      if (index !== -1) {
        this.fileList[index].url = response.url
        this.fileList[index].loading = false
      }
      // this.$set(this.listObj, file.uid, {
      //   id: file.uid,
      //   url: response.url,
      //   loading: false
      // })
    },
    handleExceededSize(size) {
      this.$Notice.error({
        title: '文件超出最大限制',
        desc: `文件最大不能超出${size}MB`
      })
    },
    handleBeforeUpload(file) {
    },
    handleSubmit() {
      const fileList = this.fileList.map(el => el.url)
      this.$emit('successCBK', fileList)
      this.$set(this, 'listObj', {})
      this.dialogVisible = false
    },
    handleRemove(id) {
      const index = this.fileList.findIndex(el => el.id === id)
      if (index !== -1) {
        this.fileList.splice(index, 1)
      }
      // this.$delete(this.listObj, id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .flip-list-move {
    transition: transform 0.5s;
  }
  /deep/ .ivu-modal {
    width: auto !important;
    max-width: 740px;
  }
  .upload {
    margin-top: 30px;
    &__preview {
      max-height: 500px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        width: 100%;
        background: transparent;
        border-radius: 6px;
      }
      &:hover {
        &::-webkit-scrollbar-thumb {
          background: #999999;
        }
      }
    }
  }
  .list {
    position: relative;
    width: 130px;
    height: 130px;
    font-size: 0;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 6px;
    display: inline-block;
    overflow: hidden;
    border: 1px solid #d4d4d4;
    padding: 2px;
    cursor: move;
    &__img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
    &__handle {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .4);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .1s ease;
      opacity: 0;
    }
    &__icon {
      cursor: pointer;
    }
    &:hover &__handle {
      opacity: 1;
    }
  }
  .footer {
    margin-top: 10px;
    text-align: center;
    &__btn {
      & + & {
        margin-left: 10px;
      }
    }
  }
  @media screen and (max-width: 900px) {
    /deep/ .ivu-modal {
      width: auto !important;
      max-width: 600px;
    }
  }
  @media screen and (max-width: 650px) {
    /deep/ .ivu-modal {
      width: auto !important;
      max-width: 100%;
      margin: 0 10px;
    }
  }
</style>
