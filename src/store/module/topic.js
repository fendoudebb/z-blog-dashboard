import {getTopicList} from '@/api/topic';

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    handleTopicList({state, commit}) {
      return new Promise((resolve, reject) => {
        getTopicList().then(res => {
          resolve(res);
        }).catch(err => {
          // reject(err);
        });
      })
    }
  },

}
