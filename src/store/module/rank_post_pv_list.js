import {getPostPvList} from '@/api/rank_post';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setPvListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getPvListSize: state => {
      return state.size;
    }
  },
  actions: {
    handlePostPvList({state, commit}) {
      return new Promise((resolve, reject) => {
        getPostPvList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
