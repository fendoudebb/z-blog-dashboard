import {getIpUnrecognizedList, getUnrecognizedIp} from '@/api/ip_unrecognized';

export default {
  state: {
    page: 1,
    size: 10,
    unrecognizedIp: ''
  },
  mutations: {
    setIpUnrecognizedListPage(state, page) {
      state.page = page
    },
    setUnrecognizedIp(state, unrecognizedIp) {
      state.unrecognizedIp = unrecognizedIp
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
    },
    handleQueryUnrecognizedIp({state, commit}) {
      return new Promise((resolve, reject) => {
        getUnrecognizedIp(state.unrecognizedIp).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
  },

}
