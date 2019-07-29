import {getAdministratorList} from '@/api/administrator';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setAdministratorListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getAdministratorListSize: state => {
      return state.size;
    }
  },
  actions: {
    handleAdministratorList({state, commit}) {
      return new Promise((resolve, reject) => {
        getAdministratorList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
  },

}
