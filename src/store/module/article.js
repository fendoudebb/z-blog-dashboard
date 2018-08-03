import {getArticleList} from '@/api/article';

export default {
  state: {
    page: 0,
    size: 10,
  },
  actions: {
    handleArticleList() {
      return new Promise((resolve, reject) => {
        getArticleList().then(res => {
          console.log("aaaa");
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
