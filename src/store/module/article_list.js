import {getArticleList} from '@/api/article';

export default {
  state: {
    page: 0,
    size: 1,
  },
  mutations: {
    setListPage(state, page) {
      state.page = page
    },
  },
  actions: {
    handleArticleList({state, commit}) {
      return new Promise((resolve, reject) => {
        getArticleList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          // reject(err);
        });
      })
    }
  },

}
