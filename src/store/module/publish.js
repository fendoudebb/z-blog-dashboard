import {publishArticle} from '@/api/publish';

export default {
  state: {
    title: '',
    content: '',

  },
  actions: {
    handlePublishArticle({state, commit}) {
      return new Promise((resolve, reject) => {
        publishArticle(state).then(value => {
          console.log("aaaa");
          resolve(value);
        }).catch(reason => {
          reject(reason);
        })
      })
    }
  },

}
