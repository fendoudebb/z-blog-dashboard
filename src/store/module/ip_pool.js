import {getIpPoolList} from '@/api/ip_pool';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setIpPoolListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getIpPoolListSize: state => {
      return state.size;
    }
  },
  actions: {
    handleIpPoolList({state, commit}) {
      return new Promise((resolve, reject) => {
        getIpPoolList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
