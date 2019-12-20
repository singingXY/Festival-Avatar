import Vue from 'vue'
import App from './App.vue'

import { Button, Popup, Notify, Tab, Tabs } from 'vant'

Vue.use(Button)
  .use(Popup)
  .use(Notify)
  .use(Tab)
  .use(Tabs)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
