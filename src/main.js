import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

// import FastClick from 'fastclick'
// 解决移动端300ms延迟

// 懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 使用懒加载
Vue.use(VueLazyLoad);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
