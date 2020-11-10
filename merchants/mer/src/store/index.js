import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid:0,
  },
  mutations: {
    //更新uid
    updataUid(state,num){
      state.uid=num;
    },
  },
  actions: {
  },
  modules: {
  }
})
