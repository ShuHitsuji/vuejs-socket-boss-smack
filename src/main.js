import Vue from 'vue'
import App from './App.vue'
import VueDisabled from 'vue-disabled'
Vue.use(VueDisabled)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
