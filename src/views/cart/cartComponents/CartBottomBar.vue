<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-btn" :isChecked="isSelectAll" @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：￥{{totalPrice}}</div>
    <div class="calculate" @click="calClick">去计算{{cartLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.getters.cartList
        .filter(item => item.checked)
        .reduce((sum, item) => {
          return sum + item.price * item.count
        }, 0)
        .toFixed(2) //价格保留2位小数
    },
    cartLength() {
      return `(${
        this.$store.getters.cartList.filter(item => item.checked).length
      })`
    },
    //购物车中的商品是否全部被选中
    isSelectAll() {
      if (this.$store.getters.cartList.length === 0) return false

      //未选中的商品的长度
      // return (
      //   this.$store.getters.cartList.filter(item => !item.checked).length === 0
      // )

      //或者：只要找到一个商品是未被选中状态就不是全部选中状态
      return !this.$store.getters.cartList.find(item => !item.checked)
    }
  },
  methods: {
    //全选按钮
    selectAllClick() {
      //如果原来都是选中状态，则点击全部不选中;
      //如果原来都是未选中（或者某些未选中）状态，则点击全部选中
      if (this.isSelectAll) {
        this.$store.getters.cartList.forEach(item => (item.checked = false))
      } else {
        this.$store.getters.cartList.forEach(item => (item.checked = true))
      }
    },
    calClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择要购买的商品", 1500)
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 80px;
}
.check-btn {
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
}
</style>
