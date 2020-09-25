// import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'
import publish from './module/publish'
import search_stats from './module/search_stats'

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  getters: {
    //
  },
  modules: {
    app,
    publish,
    search_stats,
  }
})
