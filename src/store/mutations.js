import {
  ADD_COUNT,
  ADD_PRODUCT
} from './mutation-types'

export default {
  [ADD_COUNT](state, payload) {
    payload.count++;
  },
  [ADD_PRODUCT](state, payload) {
    //新添加的商品默认为选中状态
    payload.checked = true;
    state.cartList.push(payload);
  }
}
