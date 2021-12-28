import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'


import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    user: null,

  },
  mutations: {

    authUser (state, userData) {
      state.token = userData.token
    },
    clearAuthData (state) {
      state.idToken = null
    }
  },
  actions: {
    createHil({},formData) {
      console.log(formData);
      axios.post('/hils', {
        labcarname: formData.labcarname,
      })
        .then(res => {
          router.replace('/dashboard')
          console.log('Added new hil!');
        })
        .catch(error => console.log(error))
    },
    createHilEntry({},formData) {
      console.log(formData);
      axios.post('/hils/' + formData.hilNumber + '/hilentries', {
        machinename: formData.machinename,
        osversion: formData.osversion,
        projectname: formData.projectname,
        selectedServers: formData.selectedServers,
        labcarType: formData.labcarType,
        autorun: formData.autorun,
      })
        .then(res => {
          router.replace('/dashboard')
          console.log('Added new hilEntry!');
          
        })
        .catch(error => console.log(error))
    },
    login ({commit}, authData) {

      axios.post('/login', {
        username: authData.username,
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          commit('authUser', {
            token: res.data.token,
          })
          router.replace('/dashboard')
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      commit('authUser', {
        token: token,
      })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      router.replace('/signin')
    },
    
  },
  getters: {
    isAuthenticated (state) {
      return state.token !== null
    },

  },

})