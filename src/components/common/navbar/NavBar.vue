<template>
  <div id="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
#nav-bar {
  position: relative;
  z-index: 10;

  display: flex;
  height: 44px;
  line-height: 44px;
  /* box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2); */
  box-shadow: 0 -2px 8px rgba(100, 100, 100, 0.2);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
  text-align: center;
}
</style>