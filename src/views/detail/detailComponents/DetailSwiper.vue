<template>
  <div class="wrapper">
    <swiper :options="swiperOption" class="swiper-wrapper">
      <swiper-slide v-for="(item, index) in topImages" :key="index">
        <img :src="item" class="swiper-img" />
      </swiper-slide>
      <template v-slot:pagination>
        <div class="swiper-pagination"></div>
      </template>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        // 显示控制轮播图的小圆点、
        pagination: {
          el: ".swiper-pagination"
        },
        //自动切换
        autoplay: true, // 默认3s切换一次
        //让Swiper看起来是循环的
        loop: true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// 让轮播图小按钮的颜色为白色
// >>> 表示让样式进行穿透，不受scoped的限制，只要是 .wrapper下面的 .swiper-pagination-bullet-active样式，样式就作相应改变
.wrapper >>> .swiper-pagination-bullet-active {
  background: #fff;
}

// 解决用户网速慢加载慢时，文字比图片先展示出来造成的屏幕抖动
.wrapper {
  width: 100%;
  height: 0;
  overflow: hidden;
  // 轮播图片的height/width比例：
  padding-bottom: 63%;
  background-color: #eee;
}

.swiper-wrapper {
  width: 100%;
  height: 240px;
}

.swiper-img {
  width: 100%;
}
</style>
