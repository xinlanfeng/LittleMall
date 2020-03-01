//混入

import {
  debounce
} from './utils'

export const itemImageListenerMinin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    //防抖
    this.newRefresh = debounce(this.$refs.HomeScroll.refresh, 200)

    //保存全局事件监听
    this.itemImageListener = () => {
      // 刷新太频繁，需要防抖
      // this.$refs.HomeScroll.refresh()
      this.newRefresh()
    }

    //监听goodsListItem的图片加载是否完成
    this.$bus.$on("itemImageLoad", this.itemImageListener)
  }
}

import BackTop from "components/content/backTop/BackTop"

//backTop回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTopShow: false
    }
  },
  methods: {
    //回到顶部
    backTopClick() {
      //获取并调用Scroll.vue组件的scrollTo方法
      this.$refs.HomeScroll.scrollTo(0, 0, 300)
    },
  }
}
