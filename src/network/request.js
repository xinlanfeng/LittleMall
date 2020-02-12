import axios from "axios";

export function request(config) {
  //1. 创建axios实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000/api/hy",
    // baseURL: "http://123.207.32.32:8000/api/hy",
    timeout: 5000
  })

  //2. axios拦截器
  //请求拦截器
  instance.interceptors.request.use(
    config => {
      //1. 筛选config中一些不符合服务器要求的信息
      //2. 每次发送网络请求时，在界面显示一个请求的图标
      //3. 某些网络请求(比如：登录token), 必须携带一些特殊信息
      // console.log(config);
      return config;
    },
    err => {
      console.log(err);
    }
  )

  //响应拦截器
  instance.interceptors.response.use(
    res => {
      //console.log(res);
      return res.data;
    },
    err => {
      console.log(err);
    }
  )

  //3. 发送网络请求
  // 返回的是一个Promise对象
  return instance(config);
}
