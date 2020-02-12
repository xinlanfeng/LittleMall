//对首页数据的请求

import {
  request
} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    //参数传递
    params: {
      type,
      page
    }
  })
}
