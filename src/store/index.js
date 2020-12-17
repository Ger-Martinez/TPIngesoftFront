import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productsToCompare:[]
  },
  mutations: {
    addProduct(state, product){
      state.productsToCompare.push(product);
    },
    removeProduct(state, index){
      state.productsToCompare.splice(index,1);
    }
  },
  actions: {
    addProductAction(context, product){
      context.commit('addProduct', product);
    },
    removeProducts({context, state}, name){
      console.log(state.productsToCompare.length)
      for(var i=0 ; i<state.productsToCompare.length ; i++){
        console.log('entre al for')
        if(state.productsToCompare[i].name==name){
          context.commit('removeProduct', i);
          break;
        }
      }
    }
  },
  getters:{
    getProductsArray(state){
      return state.productsToCompare;
    }
  }
})
