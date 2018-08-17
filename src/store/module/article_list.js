import {getArticleList} from '@/api/article';

export default {
  state: {
    page: 0,
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
