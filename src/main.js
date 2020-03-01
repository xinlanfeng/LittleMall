import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

//自己封装一个toast插件
import toast from "components/common/toast";

//使用fastclick解决移动端300ms延迟
import FastClick from "fastclick";
FastClick.attach(document.body);

//使用vue-lazyload实现图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  //图片未加载完全时的占位图
  loading: require("./assets/img/common/placeholder.png")
});

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);
//安装toast插件
Vue.use(toast);
//添加事件总线bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
