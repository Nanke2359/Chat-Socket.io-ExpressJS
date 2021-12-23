/*
 * @Description: 
 * @Author: NanKe
 * @Date: 2021-12-21 19:55:43
 * @LastEditTime: 2021-12-22 23:01:39
 * @LastEditors: NanKe
 * @Cnblogs: https://www.cnblogs.com/NanKe-Studying/
 * @FilePath: \Chat-Socket.io-ExpressJS\web\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../src/common/iconfont.css'

import bulma from 'bulma'
import 'bulma/css/bulma.css'
Vue.use(bulma)

import xvueui from 'xvue-ui'
Vue.use(xvueui)

import SocketIO from "socket.io-client"
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:5000'),
 
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
