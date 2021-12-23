/*
 * @Description: 
 * @Author: NanKe
 * @Date: 2021-12-21 19:55:43
 * @LastEditTime: 2021-12-21 19:59:24
 * @LastEditors: NanKe
 * @Cnblogs: https://www.cnblogs.com/NanKe-Studying/
 * @FilePath: \Chat-Socket.io-ExpressJS\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
