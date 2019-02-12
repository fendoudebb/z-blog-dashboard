// import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import publish from './module/publish'
import post_list from './module/post_list'
import post_audit from './module/post_audit'
import post_draft from './module/post_draft'
import topic from './module/topic'

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
    user,
    app,
    publish,
    post_list,
    post_audit,
    post_draft,
    topic
  }
})
