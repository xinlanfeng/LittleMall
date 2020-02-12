<template>
  <div class="wrapper">
    <!-- v-if="swiperList.length" 解决默认显示轮播图最后一张的问题（该问题是因为未获取json数据时swiperList是一个空数组引起的）-->
    <!-- <swiper :options="swiperOption" v-if="swiperList.length"> -->
    <!-- 但最好不要在模板中出先计算length等逻辑性语句，所以改用计算属性computed完成 -->
    <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" class="swiper-img" />
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数

        // 显示控制轮播图的小圆点、
        pagination: {
          el: ".swiper-pagination"
        },
        //让Swiper看起来是循环的
        loop: true,
        //自动切换
        autoplay: true // 默认3s切换一次
        // autoplay: {
        //   delay: 1000,//1秒切换一次
        // }
      }
    };
  },
  computed: {
    showSwiper() {
      return this.banners.length;
    }
  }
};
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
  padding-bottom: 52%;
  background-color: #eee;
}

.swiper-img {
  width: 100%;
}
</style>
