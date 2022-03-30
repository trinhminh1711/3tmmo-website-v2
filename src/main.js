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
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmlldHRoYW5ndnFocCIsImlhdCI6MTY0ODU2ODI5OSwiZXhwIjoxNjQ4NTcxODk5fQ.JtXcC-eEtCPJMQ8cbO0zK53W7wGklUjJixDxbYdxP1I";
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
