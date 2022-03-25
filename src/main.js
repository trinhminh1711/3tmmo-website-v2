import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import excel from "vue-excel-export";
import { VueEditor } from "vue2-editor";
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmlldHRoYW5ndnFocCIsImlhdCI6MTY0ODIyNDEyOCwiZXhwIjoxNjQ4MjI3NzI4fQ.fhtRzSTnB-gfNGogyohGXZvOZ_Mmkbb9n2DTakkdic4";
Vue.config.productionTip = false;
Vue.use(excel);
new Vue({
  router,
  vuetify,
  store,
  VueEditor,
  render: (h) => h(App),
}).$mount("#app");
