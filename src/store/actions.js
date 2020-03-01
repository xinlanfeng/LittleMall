import {
  ADD_COUNT,
  ADD_PRODUCT
} from './mutation-types'

export default {
  //往cartList中添加商品
  addCart({
    state,
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      //payload代表新添加的商品
      //如果原来购物车中有这个商品，则数量+1，如果原来购物车中没有这个商品则添加进购物车，数量为1
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {
        commit(ADD_COUNT, oldProduct)
        resolve("购物车中商品数量加1")
      } else {
        //新添加的商品默认数量为1
        payload.count = 1;
        commit(ADD_PRODUCT, payload)
        resolve("成功添加商品到购物车")
      }
    })
  }
}
