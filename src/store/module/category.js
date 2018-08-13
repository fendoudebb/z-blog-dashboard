import {getCategoryList} from '@/api/category';

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    handleCategoryList({state, commit}) {
      return new Promise((resolve, reject) => {
        getCategoryList().then(res => {
          resolve(res);
        }).catch(err => {
          // reject(err);
        });
      })
    }
  },

}
