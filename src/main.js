import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload'
import toast from '@/components/common/toast';

// 安装插件，就会调用toast的install函数
Vue.use(toast);

// 安装图片懒加载插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/img/common/placeholder.png'),
  attempt: 1
})

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue();
// 减少移动端300ms的延迟
Fastclick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')