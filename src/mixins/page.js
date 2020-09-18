const defaultPage = {
  page: 1,
  total: 0,
  size: 10,
  totalPage: 0
}
export default {
  data() {
    return {
      page: this.$_.cloneDeep(defaultPage)
    }
  },
  computed: {
    pageEnd() {
      return this.page.page >= this.totalPage
    }
  },
  methods: {
    setPageOption(options) {
      this.$_.assign(this.page, {
        page: options.current_page || 1,
        totalPage: options.total_page || 0,
        total: options.total_count || 0
      })
    },
    resetPageOption() {
      this.page = this.$_.cloneDeep(defaultPage)
    },
    pageChange(options) {
      this.page.size = options.size
      this.page.page = options.page
      this.onPageChange && this.onPageChange()
    }
  }
}
