import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSignaturePad from "vue-signature-pad";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(VueSignaturePad);
Vue.use(axios);
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  router,
  store,
  vuetify,
  VueSignaturePad,
  render: (h) => h(App),
}).$mount("#app");
