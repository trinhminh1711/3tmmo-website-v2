import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import excel from 'vue-excel-export'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmlldHRoYW5ndnFocCIsImlhdCI6MTY0NzUzNDY5OSwiZXhwIjoxNjQ3NTM4Mjk5fQ.WgPi1fg0ddUMOxQsSIkTtUNpbUUfSHT7GINKBbx-ZzM';
Vue.config.productionTip = false
Vue.use(excel)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
