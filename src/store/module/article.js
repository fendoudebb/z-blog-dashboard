import {getArticleList} from '@/api/article';

export default {
  state: {
    page: 0,
    size: 10,
  },
  actions: {
    handleArticleList({state, commit}) {
      return new Promise((resolve, reject) => {
        getArticleList().then(res => {
          resolve(res);
        }).catch(err => {
          // reject(err);
        });
      })
    }
  },

}
