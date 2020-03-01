<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="HomeScroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-image-info :detailImageInfo="detailImageInfo" @detailImageLoad="detailImgLoad"></detail-image-info>
      <detail-params-info :paramsInfo="paramsInfo" ref="detailParams"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="detailComment"></detail-comment-info>
      <goods-list :goods="recommends" ref="detailRecommends"></goods-list>
    </scroll>
    <backTop @click.native="backTopClick" v-show="isBackTopShow"></backTop>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :isShow="isToastShow"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./detailComponents/DetailNavBar"
import DetailSwiper from "./detailComponents/DetailSwiper"
import DetailBaseInfo from "./detailComponents/DetailBaseInfo"
import DetailShopInfo from "./detailComponents/DetailShopInfo"
import DetailImageInfo from "./detailComponents/DetailImageInfo"
import DetailParamsInfo from "./detailComponents/DetailParamsInfo"
import DetailCommentInfo from "./detailComponents/DetailCommentInfo"
import DetailBottomBar from "./detailComponents/DetailBottomBar"

import { getDetail, getDetailGoods, getDetailRecommend } from "network/detail"

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"
// import Toast from "components/common/toast/Toast"

import { debounce } from "common/utils"
import { itemImageListenerMinin, backTopMixin } from "common/mixin"

import { mapActions } from "vuex"

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailImageInfo: {},
      paramsInfo: {},
      commentInfo: [],
      recommends: [],
      // 0表示商品部分距离顶部的位置
      themeTopYs: [0],
      getThemeTopY: null,
      currentIndex: 0
      // message: "",
      // isToastShow: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
    // Toast
  },
  //混入
  mixins: [itemImageListenerMinin, backTopMixin],
  //使用的是vue-router路由跳转，且加了keep-alive修饰，所以，每次进入详情页并不会再次创建此组件，即：不会每次都执行created生命周期函数
  //所以像详情页这样每次展示的页面是不一样的，就没有必要使用keep-alive了
  //使用keep-alive的属性exclude剔除详情页面
  created() {
    //获取具体点击商品的iid
    this.iid = this.$route.params.iid

    //请求详情数据：
    getDetail(this.iid).then(res => {
      // console.log(res)
      //获取数据
      const data = res.result

      //详情页轮播图数据
      this.topImages = data.itemInfo.topImages

      //创建商品对象，获取商品的具体信息
      this.goodsInfo = new getDetailGoods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )

      //获取店铺信息
      this.shopInfo = data.shopInfo

      //获取商品详情信息
      this.detailImageInfo = data.detailInfo

      //获取商品的参数信息
      this.paramsInfo = data.itemParams

      //获取商品的评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list
      }
    })

    //请求推荐数据
    getDetailRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })

    //图片加载完成后，计算详情页各部分距离顶部的值，但调用过于频繁，需要防抖
    this.getThemeTopY = debounce(() => {
      //图片加载完成后，计算详情页各部分距离顶部的值
      this.themeTopYs = [0]
      //参数部分距离顶部的值
      this.themeTopYs.push(this.$refs.detailParams.$el.offsetTop)
      //评论部分距离顶部的值
      this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop)
      //推荐部分距离顶部的值
      this.themeTopYs.push(this.$refs.detailRecommends.$el.offsetTop)

      this.themeTopYs.push(Number.MAX_SAFE_INTEGER)
    }, 200)
  },
  destroyed() {
    //离开Detail页面时，取消Detail页面的全局事件监听
    this.$bus.$off("itemImageLoad", this.itemImageListener)
  },
  methods: {
    //将Vuex的actions中的方法映射到组件的methods中
    ...mapActions(["addCart"]),

    //监听详情图片的加载是否完成
    detailImgLoad() {
      //this.$refs.HomeScroll.refresh();
      //mixin混入，防抖
      this.newRefresh()

      //this.$nextTick是根据现有数据渲染完DOM后进行回调，不能保证此时图片是否已经加载完成
      //图片加载完成后，计算详情页各部分距离顶部的值
      //但是调用过于频繁，需要防抖
      this.getThemeTopY()
    },

    //联动效果 —— 实现点击标题滚动到对应内容
    titleClick(index) {
      this.$refs.HomeScroll.scrollTo(0, -this.themeTopYs[index], 200)
    },

    //联动效果 —— 实现滚动到对应内容区域时显示对应标题
    contentScroll(position) {
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          -position.y >= this.themeTopYs[i] &&
          -position.y < this.themeTopYs[i + 1]
        ) {
          //这里记录i 和 if的条件1 是为了不频繁的给this.currentIndex赋值
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      }

      //滚动到一定区域显示backTop回到顶部
      this.isBackTopShow = -position.y > 1000
    },

    //加入购物车
    addToCart() {
      //1. 获取商品信息
      const product = {
        iid: this.iid,
        image: this.topImages[0],
        title: this.goodsInfo.title,
        desc: this.goodsInfo.desc,
        price: this.goodsInfo.realPrice
      }

      //2. 将商品加入到购物车  -- 使用 Vuex 保存商品信息
      // this.$store.commit("addToCart", product) -- 通过mutations

      //通过actions
      //弹出toast，显示添加到购物车成功, actions中可以返回一个Promise对象
      // this.$store.dispatch("addToCart", product).then(res => console.log(res))

      //可以使用vuex的mapActions将actions中的方法映射到组件的methods中
      this.addCart(product).then(res => {
        //使用组件的方式封装Toast
        /*
          this.isToastShow = true
          this.message = res

          //toast弹窗 1.5s 后消失
          setTimeout(() => {
            this.isToastShow = false
            this.message = ""
          }, 1500)
        */

        //使用插件的方式封装Toast
        this.$toast.show(res, 1500)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 3;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>
