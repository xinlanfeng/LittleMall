<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <scroll
      class="content"
      ref="HomeScroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-upload="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="titles"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <backTop @click.native="backTopClick" v-show="isBackTopShow"></backTop>
  </div>
</template>

<script>
import HomeSwiper from "./homeComponents/HomeSwiper";
import HomeRecommendView from "./homeComponents/HomeRecommendView";
import FeatureView from "./homeComponents/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

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
      currentType: "pop",
      isBackTopShow: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //请求轮播图和列表数据
    this.getHomeMultidata();

    //请求商品数据 一次只能请求一页
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //获取下一页的数据
      const page = this.goods[type].page + 1;

      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;

        // 调用finishPullUp方法，在下一次下拉加载时才会起作用
        this.$refs.HomeScroll.finishPullUp();
      });
    },

    //用户事件监听相关方法
    //tab切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    //回到顶部
    backTopClick() {
      //获取并调用Scroll.vue组件的scrollTo方法
      this.$refs.HomeScroll.scrollTo(0, 0, 300);
    },
    //回到顶部在滚动到一定距离后显示与消失
    contentScroll(position) {
      this.isBackTopShow = -position.y > 1000 ? true : false;
    },
    //上拉加载更多事件
    loadMore() {
      this.getHomeGoods(this.currentType);
      // console.log("上拉加载");
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  /* 设定Home的高度 */
  height: 100vh;
  /* 顶部nav-bar的高度 */
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  /* 非原生滚动时sticky就不起作用了 */
  /* position: sticky; */
  top: 44px;
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

/* .content {
  顶部navbar的高度
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>
