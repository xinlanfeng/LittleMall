<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
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
    });

    //监听滚动的位置
    //this.scroll.on的“scroll”是betterScroll内置的事件
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });

    //监听上拉加载事件
    this.scroll.on("pullingUp", () => {
      //上拉加载更多
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
};
</script>

<style scoped></style>
