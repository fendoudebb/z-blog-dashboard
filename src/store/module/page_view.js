import {getPageViewList} from '@/api/page_view';

export default {
  state: {
    page: 1,
    size: 10,
  },
  mutations: {
    setPageViewListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getPageViewListSize: state => {
      return state.size;
    }
  },
  actions: {
    handlePageViewList({state, commit}) {
      return new Promise((resolve, reject) => {
        getPageViewList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
