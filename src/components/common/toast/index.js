import Toast from './Toast.vue'

const obj = {}

//main.js中安装了插件后 Vue.use() , 会执行对象的install函数
//默认会把Vue作为参数传递过来
obj.install = function (Vue) {
  // console.log("执行了obj的install函数", Vue)

  //1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2. 通过new 组件构造器,创建一个组件对象
  const toast = new toastConstructor()

  //3. 通过组件构造器创建出来的组件对象，需要手动将组件对象挂载到某个DOM元素上
  toast.$mount(document.createElement('div'))

  //4. 将组件挂载的DOM元素添加到body中，toast.$el对应的就是创建的div元素
  document.body.appendChild(toast.$el)

  //5. 将组件对象添加到vue中
  Vue.prototype.$toast = toast
}

export default obj;
