import {getPostList} from '@/api/post';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getListSize: state => {
      return state.size;
    }
  },
  actions: {
    handlePostList({state, commit}) {
      return new Promise((resolve, reject) => {
        getPostList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
