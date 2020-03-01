<template>
  <div>
    <nav-bar class="detail-nav">
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div
            v-for="(item,index) in titles"
            :key="index"
            class="title-item"
            @click="titleItemClick(index)"
            :class="{titleItemActive: currentIndex === index}"
          >{{item}}</div>
        </div>
      </template>
      <template v-slot:right>
        <div></div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    }
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index
      this.$emit("titleClick", index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  position: relative;
  z-index: 4;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.titleItemActive {
  color: var(--color-high-text);
}
.back img {
  margin-top: 11px;
  margin-left: 16px;
}
</style>
