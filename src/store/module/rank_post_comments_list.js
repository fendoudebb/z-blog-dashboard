import {getPostCommentsList} from '@/api/rank_post';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setCommentsListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getCommentsListSize: state => {
      return state.size;
    }
  },
  actions: {
    handlePostCommentsList({state, commit}) {
      return new Promise((resolve, reject) => {
        getPostCommentsList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
