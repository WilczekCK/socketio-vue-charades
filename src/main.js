import Vue from 'vue'
import App from './App.vue'

import VueChatScroll from 'vue-chat-scroll';
import VueKonva from 'vue-konva';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueChatScroll);

Vue.use(VueKonva);
VueKonva.pixelRatio = 0.01;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
