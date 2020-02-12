<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 不要写死，根据需求来
      // probeType: 3,
      // pullUpload: true,
      probeType: this.probeType,
      pullUpload: this.pullUpload,

      //需要设置click为true,这样给除了button之外的DOM设置click事件时才会起作用
      click: true
    })

    //监听滚动的位置
    //this.scroll.on的“scroll”是betterScroll内置的事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position)
      })
    }

    //监听上拉加载事件
    if (this.pullUpload) {
      this.scroll.on("pullingUp", () => {
        //上拉加载更多
        this.$emit("pullingUp")
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      //解决bug: 图片很快加载完成后回调scroll的refresh方法，但此时Scroll.vue还未被挂载，mounted还未被执行的问题
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped></style>
