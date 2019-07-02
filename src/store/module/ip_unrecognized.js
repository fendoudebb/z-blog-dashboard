import {getIpUnrecognizedList} from '@/api/ip_unrecognized';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setIpUnrecognizedListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getIpUnrecognizedListSize: state => {
      return state.size;
    }
  },
  actions: {
    handleIpUnrecognizedList({state, commit}) {
      return new Promise((resolve, reject) => {
        getIpUnrecognizedList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
