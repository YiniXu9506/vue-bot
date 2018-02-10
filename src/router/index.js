import Vue from 'vue'
import Router from 'vue-router'
import MissionView from '@/views/MissionView'
import ExpiredMission from '@/views/ExpiredMission'

Vue.use(Router)

const NotFoundView = Vue.component('NotFoundView', {
  template: '<h1>...Ops, 404</h1>'
})

export default new Router({
  routes: [
    // {
    //   path: '/view',
    //   name: 'Hello',
    //   component: Hello
    // },
    { path: '/', redirect: '/bot/mission/expired' },
    {
      path: '/404',
      name: 'NotFoundView',
      component: NotFoundView
    },
    {
      path: '/bot/mission',
      name: 'MissionView',
      component: MissionView 
    }, 
    {
      path: '/bot/mission/expired',
      name: 'ExpiredMission',
      component: ExpiredMission  
    }
  ]
})
