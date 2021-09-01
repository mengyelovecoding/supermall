import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        addCartList: []
    },
    getters: {
        cartList(state) {
            return state.addCartList;
        }
    },
    mutations: {
        addCart(state, payLoad) {
            const oldProduct = state.addCartList.find((item) => {return item.iid === payLoad.iid})
            if (oldProduct) {
                oldProduct.count += 1;
            } else {
                payLoad.count = 1;
                payLoad.checked = true;
                state.addCartList.push(payLoad);
            }
        }
    }
})

export default store