<template>
  <div class="goods-item">
    <!-- 
      解决bug：图片还未加载完全而Better-Scroll的可滚动区域高度就已经计算完毕，导致后面部分不能滚动的问题

      this.scroll.refresh(); //BScroll重新计算可滚动高度 
      监听每一张图片是否加载完毕，加载完毕就refresh一次 (非父子组件)  ==>  使用VueX / 使用事件总线bus / 一层一层传递
    -->
    <img :src="goodsItem.show.img" @load="imageLoad" />
    <div class="goods-info">
      <!-- 标题 -->
      <p>{{goodsItem.title}}</p>
      <!-- 价格 -->
      <span class="price">￥{{goodsItem.price}}</span>
      <!-- 总收藏数 -->
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad")
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>