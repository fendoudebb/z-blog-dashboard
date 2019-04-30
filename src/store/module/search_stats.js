import {getSearchStatsList} from '@/api/search_stats';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setSearchStatsListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getSearchStatsListSize: state => {
      return state.size;
    }
  },
  actions: {
    handleSearchStatsList({state, commit}) {
      return new Promise((resolve, reject) => {
        getSearchStatsList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
