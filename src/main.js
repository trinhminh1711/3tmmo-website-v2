import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import excel from "vue-excel-export";
import { VueEditor } from "vue2-editor";
import VCalendar from "v-calendar";
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmlldHRoYW5ndnFocCIsImlhdCI6MTY0ODQzMTQxNywiZXhwIjoxNjQ4NDM1MDE3fQ.vWu9a9JZK2iK27h3-KLZeSAeeq4pkkVJykMu6sOwEoE";
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
