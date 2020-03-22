// import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'
import publish from './module/publish'
import page_view from './module/page_view'
import ip_pool from './module/ip_pool'
import ip_unrecognized from './module/ip_unrecognized'
import topic from './module/topic'
import message_board from './module/message_board'
import post_comment from './module/post_comment'
import search_stats from './module/search_stats'
import links from './module/links'
import rank_post_pv_list from './module/rank_post_pv_list'
import rank_post_likes_list from './module/rank_post_likes_list'
import rank_post_comments_list from './module/rank_post_comments_list'
import administrator from './module/administrator'

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
    page_view,
    ip_pool,
    ip_unrecognized,
    topic,
    message_board,
    post_comment,
    search_stats,
    links,
    rank_post_pv_list,
    rank_post_likes_list,
    rank_post_comments_list,
    administrator,
  }
})
