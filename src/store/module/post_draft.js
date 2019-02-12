import {getPostDraft} from '@/api/post';

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
    handlePostDraft({state, commit}) {
      return new Promise((resolve, reject) => {
        getPostDraft(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
