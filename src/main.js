import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import excel from 'vue-excel-export'
Vue.config.productionTip = false
Vue.use(excel)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
