import {modifyArticleStatus} from '@/api/article';

export default {
  state: {
    articleId: -1,
    auditStatus: '',
  },
  mutations: {
    setArticleId(state, articleId) {
      state.articleId = articleId
    },
    setAuditStatus(state, auditStatus) {
      state.auditStatus = auditStatus
    },
  },
  actions: {
    handleArticleStatus({state, commit}) {
      return new Promise((resolve, reject) => {
        modifyArticleStatus(state.articleId, state.auditStatus).then(res => {
          resolve(res);
        }).catch(err => {
          // reject(err);
        });
      })
    }
  },

}
