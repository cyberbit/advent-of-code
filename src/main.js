/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Home from './views/Home'
import List2018 from './views/List2018'
import Day2018 from './views/Day2018'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/2018',
      name: 'list2018',
      component: List2018
    },
    {
      path: '/2018/:day',
      name: 'day2018',
      component: Day2018
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
})
