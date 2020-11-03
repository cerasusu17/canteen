import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // prices: 0,
  },
  getters: {
    getprices: state => state.prices
  },
  mutations: {
    //set方法
    setprices(state,prices){
      state.prices = prices
    }
  },
  actions: {
  },
  modules: {
  }
})
