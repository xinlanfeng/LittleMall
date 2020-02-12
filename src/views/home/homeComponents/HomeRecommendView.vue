<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt />
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0px 20px 0px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend-item img {
  width: 70px;
  height: 70px;
}
.recommend-item span {
  display: block;
  padding-top: 6px;
}
</style>
