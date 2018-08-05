import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import publish from './module/publish'
import article from './module/article'

Vue.use(Vuex);

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
  modules: {
    user,
    app,
    publish,
    article
  }
})
