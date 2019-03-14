import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Navigation from 'vue-navigation' // 页面导航
import FastClick from 'fastclick'  // 移动端点击事件消除300ms延迟
import Vant from 'vant' // vantui框架
import 'vant/lib/index.css'
import directive from '@/utils/directive'
Vue.use(directive) // 扩展指令
Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(Navigation, { router }) 
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
