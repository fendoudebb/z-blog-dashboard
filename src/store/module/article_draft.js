import {getArticleDraft} from '@/api/article';

export default {
  state: {
    page: 0,
    size: 1,
  },
  mutations: {
    setDraftPage(state, page) {
      state.page = page
    },
  },
  actions: {
    handleArticleDraft({state, commit}) {
      return new Promise((resolve, reject) => {
        getArticleDraft(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          // reject(err);
        });
      })
    }
  },

}
