import {publishArticle} from '@/api/publish';

export default {
  state: {
    title: '',
    content: '',
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setContent (state, content) {
      state.content = content
    },
  },
  actions: {
    handlePublishArticle({state, commit}) {
      return new Promise((resolve, reject) => {
        publishArticle(state.title, state.content).then(value => {
          console.log("aaaa");
          resolve(value);
        }).catch(reason => {
          reject(reason);
        });
      })
    }
  },

}
