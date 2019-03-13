import {modifyPostStatus} from '@/api/post';

export default {
  state: {
    postId: '',
    auditStatus: '',
  },
  mutations: {
    setAuditPostId(state, postId) {
      state.postId = postId
    },
    setAuditStatus(state, auditStatus) {
      state.auditStatus = auditStatus
    },
  },
  actions: {
    handlePostStatus({state, commit}) {
      return new Promise((resolve, reject) => {
        modifyPostStatus(state.postId, state.auditStatus).then(res => {
          resolve(res);
        }).catch(err => {
          // reject(err);
        });
      })
    }
  },

}
