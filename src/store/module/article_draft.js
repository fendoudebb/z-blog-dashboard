import {getArticleDraft} from '@/api/article';

export default {
  state: {
    page: 0,
    size: 10,
  },
  mutations: {
    setDraftPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getDraftPage: state => {
      return state.size;
    }
  },
  actions: {
    handleArticleDraft({state, commit}) {
      return new Promise((resolve, reject) => {
        getArticleDraft(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
