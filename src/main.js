import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSignaturePad  from 'vue-signature-pad'
Vue.config.productionTip = false
Vue.use(VueSignaturePad)
new Vue({
  router,
  store,
  vuetify,
  VueSignaturePad ,
  render: h => h(App)
}).$mount('#app')
