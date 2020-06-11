import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'
// registerMicroApps 挂载子应用
// setDefaultMountApp 设置默认子应用
// start 开启qiankun

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render:(h)=>h(App)
}).$mount('#')


// 路由监听
function genActiveRule(routerPrefix) {
  console.log(location)
  return location => location.pathname.startsWith(routerPrefix);
}


// 传入子应用的数据
let msg = {
  data: {
    auth: false
  },
  fns: [
    {
      name: "_LOGIN",
      _LOGIN(data) {
        console.log(`父应用返回信息${data}`);
      }
    }
  ]
}

// 注册子应用
registerMicroApps(
  [
    {
      name: "sub-app-1",
      entry: "//localhost:8091", //入口
      render,
      activeRule: genActiveRule("/oms"),
      props: msg
    },
    {
      name: "sub-app",
      entry: "//localhost:8092",
      render,
      activeRule: genActiveRule("/saas"),
    }
  ],
  {
    beforeLoad: [
      app => {
        console.log("before load", app);
      }
    ], // 挂载前回调
    beforeMount: [
      app => {
        console.log("before mount", app);
      }
    ], // 挂载后回调
    afterUnmount: [
      app => {
        console.log("after unload", app);
      }
    ] // 卸载后回调
  }
)

// 设置默认子应用,与 genActiveRule中的参数保持一致
setDefaultMountApp("/saas")

// 启动
start()
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
