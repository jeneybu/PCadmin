import App from './App.vue'
import router from './router'
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import Toast from '@/assets/js/toast/index'
import { getHttp, postHttp } from './plugins/http'
import { api } from './plugins/api'

const VueApexCharts = require('vue-apexchart')
Vue.component('apexchart', VueApexCharts)

Vue.prototype.$get = getHttp
Vue.prototype.$post = postHttp
Vue.prototype.$api = api

Vue.config.productionTip = false;
Vue.use(Toast)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
