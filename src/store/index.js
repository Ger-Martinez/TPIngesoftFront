import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logedIn: false
  },
  mutations: {
    checkLogedIn(state){
      return state.logedIn;
    },
    changeLogedInStatus(state){
      state.logedIn = !state.logedIn;
    }
  },
  actions: {
    getLogedIn({commit}){
      return commit("checkLogedIn");
    },
    setLogedIn({commit}){
      commit("changeLogedInStatus");
    }
  },
  modules: {
  }
})
