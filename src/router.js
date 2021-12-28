import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import SigninPage from './components/auth/signin.vue'
import createHil from './components/auth/createHil.vue'
import createHilEntry from './components/auth/createHilEntry.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/createHilEntry', component: createHilEntry },
  { path: '/createHil', component: createHil },
  { path: '/signin', component: SigninPage },
  { path: '/labcarname', component: SigninPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) {
      if (store.state.token) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode: 'history', routes})