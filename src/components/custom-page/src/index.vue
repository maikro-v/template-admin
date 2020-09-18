<template>
  <div class="custom-page mt-10" :style="style">
    <Page
      :current.sync="pageNum"
      :total="options.total"
      :page-size="options.size"
      :page-size-opts="options.sizeOpts"
      :show-elevator="options.showElevator"
      :show-sizer="options.showSizer"
      :show-total="options.showTotal"
      :transfer="options.transfer"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
/**
 * pageTotal            数据总数
 * pageLimit            每页条数
 * pageLimitOpts        每页条数切换的配置
 * pageCurrent          当前页码，支持 .sync 修饰符
 * pageShowTotal        显示总数
 * pageShowElevator     显示电梯，可以快速切换到某一页
 * pageShowSizer        显示分页，用来改变page-size
 * pageTransfer         是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
 */
export default {
  name: 'custom-page',
  props: {
    page: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      /**
       * pageNum          当前页码
       * size             每页条数
       * sizeOpts         每页条数切换的配置
       * showTotal        显示总数
       * showElevator     显示电梯，可以快速切换到某一页
       * showSizer        显示分页，用来改变page-size
       * transfer         是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
       */
      pageNum: 1,
      size: this.pageSize,
      sizeOpts: [10, 20, 30, 40],
      showTotal: true,
      showElevator: true,
      showSizer: true,
      transfer: true
    }
  },
  watch: {
    page: {
      handler() {
        this.pageNum = this.page
      },
      immediate: true
    }
  },
  computed: {
    style() {
      return {
        textAlign: this.position
      }
    },
    options() {
      return {
        page: this.pageNum,
        total: this.total,
        size: this.size,
        sizeOpts: this.sizeOpts,
        showTotal: this.showTotal,
        showElevator: this.showElevator,
        showSizer: this.showSizer,
        transfer: this.transfer
      }
    }
  },
  methods: {
    pageChange(current) {
      this.pageNum = current
      this.change()
    },
    pageSizeChange(size) {
      this.size = size
      this.change()
    },
    change() {
      this.$emit('on-change', Object.assign(this.options, {
        page: this.pageNum
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
