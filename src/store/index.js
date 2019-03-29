// import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import publish from './module/publish'
import post_list from './module/post_list'
import post_audit from './module/post_audit'
import post_draft from './module/post_draft'
import post_topic from './module/post_topic'
import page_view from './module/page_view'
import ip_pool from './module/ip_pool'
import topic from './module/topic'
import message_board from './module/message_board'

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
    post_topic,
    page_view,
    ip_pool,
    topic,
    message_board
  }
})
