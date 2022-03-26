import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import excel from "vue-excel-export";
import { VueEditor } from "vue2-editor";
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmlldHRoYW5ndnFocCIsImlhdCI6MTY0ODI4Nzk5NiwiZXhwIjoxNjQ4MjkxNTk2fQ.cBsuzhwh-Kw54Qjv0cSPQ1qHCASBAIVSvcl8nc8Gya4";
Vue.config.productionTip = false;
Vue.use(excel);
new Vue({
  router,
  vuetify,
  store,
  VueEditor,
  render: (h) => h(App),
}).$mount("#app");
