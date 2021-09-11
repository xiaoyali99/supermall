import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++;
    },
    addToCart(state, payload) {
      state.cartList.push(payload);
    },
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // 查找购物车是否已经有这个商品了
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
        // let oldProduct = null;
        // for (const item of state.cartList) {
        //   if (item.iid === payload.iid) {
        //     oldProduct = item;
        //   }
        // }
        if (oldProduct) {
          // 如果有在该商品的数量上加一
          // oldProduct.count += 1;
          context.commit("addCounter", oldProduct);
          resolve("当前商品数量加一！");
        } else {
          // 如果购物车中没有该商品，设置数量为一，然后添加进去
          payload.count = 1;
          payload.checked = true;
          // state.cartList.push(payload);
          context.commit("addToCart", payload);
          resolve("已经添加了该商品！");
        }
      });
    }
  },
  modules: {},
  getters: {
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state) {
      return state.cartList;
    },
  }
})