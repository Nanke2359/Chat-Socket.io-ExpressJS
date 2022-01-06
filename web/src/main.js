/*
 * @Description: 
 * @Author: NanKe
 * @Date: 2021-12-21 19:55:43
 * @LastEditTime: 2021-12-27 13:07:37
 * @LastEditors: NanKe
 * @Cnblogs: https://www.cnblogs.com/NanKe-Studying/
 * @FilePath: \Chat-Socket.io-ExpressJS\web\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../src/common/iconfont.css'
import '../src/common/base.css'

import bulma from 'bulma'
import 'bulma/css/bulma.css'
Vue.use(bulma)

import xvueui from 'xvue-ui'
Vue.use(xvueui)

import SocketIO from "socket.io-client"
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  // connection: SocketIO('http://localhost:5000'),
  connection: SocketIO('http://nanke777.vaiwan.com'),

}))

import animated from 'animate.css' // npm install animate.css --save安装，再引入
Vue.use(animated)

Vue.config.productionTip = false

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
