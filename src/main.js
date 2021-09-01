import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/load.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
