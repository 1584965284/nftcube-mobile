import Vue from 'vue'
import App from './App.vue'
import '@/mobile/flexible'
import './styles/reset.css'
import router from '@/router'

import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/index.less';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
