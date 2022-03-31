import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import excel from "vue-excel-export";
import { VueEditor } from "vue2-editor";
import VCalendar from "v-calendar";
import axios from "axios";
import { Service } from "axios-middleware";
const service = new Service(axios);
service.register({
  onRequest(config) {
    config.headers.Authorization = "Bearer " + sessionStorage.getItem("token");
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpZXR0aGFuZ3ZxaHAiLCJ1c2VyX2lkIjoxLCJyb2xlIjoiMCIsImlhdCI6MTY0ODczNTMzNX0.q8h3znvDOwdG8rlh8cUdut0b8J8DNd86v0z1BxJHt9U
    return config;
  },
});
Vue.config.productionTip = false;
Vue.use(excel);
Vue.use(VCalendar, {
  componentPrefix: "vc",
});
new Vue({
  router,
  vuetify,
  store,
  VueEditor,
  render: (h) => h(App),
}).$mount("#app");
