import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import './public-path'

Vue.config.productionTip = false

let router = null
let instance = null

function render() {
  router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/saas' : '/',
    routes
  })

  instance = new Vue({
    store,
    router,
    render: (h) => h(App)
  }).$mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出生命周期
export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('props from main app', props);
  render();
}

// 卸载
export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
