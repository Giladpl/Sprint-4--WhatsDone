import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import { uniLayerGroupMonochrome, uniCarWash } from 'vue-unicons/dist/icons';

import './styles/styles.scss';

Vue.use(ElementUI);

Unicon.add([uniLayerGroupMonochrome, uniCarWash]);
Vue.use(Unicon);




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
