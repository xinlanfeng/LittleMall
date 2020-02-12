<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      v-for="(item, index) in titles"
      :key="index"
      @click="tabItemClick(index)"
    >{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabItemClick(index) {
      this.currentIndex = index
      this.$emit("tabClick", index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  background-color: #fff;
}
.tab-control-item {
  position: relative;
  flex: 1;
}
.active {
  color: var(--color-high-text);
  /* border-bottom: 2px solid var(--color-high-text); */
}
.active::after {
  position: absolute;
  bottom: 5px;
  left: 50%;
  margin-left: -25px;
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background-color: var(--color-tint);
}
</style>
