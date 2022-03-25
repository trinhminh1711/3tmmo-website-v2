import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import excel from "vue-excel-export";
import { VueEditor } from "vue2-editor";
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmlldHRoYW5ndnFocCIsImlhdCI6MTY0ODIwMTcxMywiZXhwIjoxNjQ4MjA1MzEzfQ.M7jCspd-AY1PEALTloWqGFZ5g265YzdjVR0dqQ-refc";
Vue.config.productionTip = false;
Vue.use(excel);
new Vue({
  router,
  vuetify,
  store,
  VueEditor,
  render: (h) => h(App),
}).$mount("#app");
