<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl2"
      class="tab-control-fixed"
      v-show="isTabFixedShow"
    ></tab-control>
    <scroll
      class="content"
      ref="HomeScroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-upload="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <backTop @click.native="backTopClick" v-show="isBackTopShow"></backTop>
  </div>
</template>

<script>
import HomeSwiper from "./homeComponents/HomeSwiper"
import HomeRecommendView from "./homeComponents/HomeRecommendView"
import FeatureView from "./homeComponents/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"

import { getHomeMultidata, getHomeGoods } from "network/home"

import { debounce } from "common/utils"
import { itemImageListenerMinin, backTopMixin } from "common/mixin"

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: {
          //当前获取了多少页的数据
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      saveY: 0,
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixedShow: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  //混入
  mixins: [itemImageListenerMinin, backTopMixin],
  created() {
    //请求轮播图和列表数据
    this.getHomeMultidata()

    //请求商品数据 一次只能请求一页
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")

    // 注意：不要在组件创建created后，去用this.$refs或者document.querySelector()获取DOM或者某个组件，拿不到,在mounted挂载后获取
  },
  activated() {
    this.$refs.HomeScroll.scrollTo(0, this.saveY, 0)
    this.$refs.HomeScroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.HomeScroll.getScrollY()

    //离开Home页面时，取消Home页面的全局事件监听
    this.$bus.$off("itemImageLoad", this.itemImageListener)
  },
  methods: {
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      //获取下一页的数据
      const page = this.goods[type].page + 1

      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++

        // 调用finishPullUp方法，完成本次下拉加载更多，在下一次下拉加载时才会起作用
        this.$refs.HomeScroll.finishPullUp()
      })
    },

    //用户事件监听相关方法
    //tab切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }

      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

      //点击一个新的tab时，滚动到开头
      if (-this.$refs.HomeScroll.getScrollY() > this.tabOffsetTop) {
        this.$refs.HomeScroll.scrollTo(0, -this.tabOffsetTop, 0)
      }
    },
    //监听滚动
    contentScroll(position) {
      //回到顶部在滚动到一定距离后显示与消失
      this.isBackTopShow = -position.y > 1000

      //滚动到一定位置时，tabControl吸附于顶部
      this.isTabFixedShow = -position.y > this.tabOffsetTop
      //注意：由于better-scroll内部的实现原理，所以这里没有办法通过给tabControl设置fixed样式使其吸附于顶部
    },
    //上拉加载更多事件
    loadMore() {
      this.getHomeGoods(this.currentType)
      // console.log("上拉加载");
    },
    //轮播图加载完成后，获取tabControl的offsetTop，让tabControl滚动到一定距离后吸附在顶部
    swiperImageLoad() {
      //所有的组件都有一个属性$el, 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el)
      //必须等tabControl前面的所有图片都加载完毕后，才能正确计算出offsetTop
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    }
  }
}
</script>

<style scoped>
#home {
  /* position: relative; */
  /* 设定Home的高度 */
  height: 100vh;
  width: 100vw;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;*/
  z-index: 9;
}
.content {
  /* 使用绝对定位确定中间滚动内容区域的高度 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control-fixed {
  position: relative;
  z-index: 9;
}
</style>
