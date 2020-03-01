<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="CartScroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"

import { mapGetters } from "vuex"

import CartList from "./cartComponents/CartList"
import CartBottomBar from "./cartComponents/CartBottomBar"

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    //使用vuex的mapGetters将vuex的getters中的属性映射到组件的computed中
    ...mapGetters(["cartLength"])
  },
  activated() {
    this.$refs.CartScroll.refresh()
  }
}
</script>

<style scoped>
#cart {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>
