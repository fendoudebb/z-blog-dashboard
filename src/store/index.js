import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import publish from './module/publish'
import article_list from './module/article_list'
import article_audit from './module/article_audit'
import article_draft from './module/article_draft'
import category from './module/category'

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
    article_list,
    article_audit,
    article_draft,
    category
  }
})
