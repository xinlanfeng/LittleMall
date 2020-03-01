<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  //以组件的方式封装toast
  /*
  props: {
    message: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  */
  //以插件的方式封装toast
  data() {
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message, duration = 1500) {
      this.isShow = true
      this.message = message

      // duration ms后弹窗消失
      setTimeout(() => {
        this.isShow = false
        this.message = ""
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  /* 在原本的位置上向左平移其宽度的50%，向上平移其高度的50% */
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 10px;
  z-index: 10;
}
</style>
