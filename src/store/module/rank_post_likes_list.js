import {getPostLikesList} from '@/api/rank_post';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setLikesListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getLikesListSize: state => {
      return state.size;
    }
  },
  actions: {
    handlePostLikesList({state, commit}) {
      return new Promise((resolve, reject) => {
        getPostLikesList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
