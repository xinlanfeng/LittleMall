import {
  request
} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getDetailRecommend() {
  return request({
    url: '/recommend'
  })
}

//详情页商品数据类
export class getDetailGoods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.desc = itemInfo.desc;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.discountBgColor = itemInfo.discountBgColor;
    this.realPrice = itemInfo.lowNowPrice;
  }
}
