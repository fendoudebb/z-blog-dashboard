import {addPostTopic, deletePostTopic} from '@/api/post';

export default {
  state: {
    addTopicPostId: '',
    deleteTopicPostId: '',
    addTopic: '',
    deleteTopic: '',
  },
  mutations: {
    setAddTopicPostId(state, postId) {
      state.addTopicPostId = postId
    },
    setDeleteTopicPostId(state, postId) {
      state.deleteTopicPostId = postId
    },
    setAddTopic(state, topic) {
      state.addTopic = topic
    },
    setDeleteTopic(state, topic) {
      state.deleteTopic = topic
    },
  },
  actions: {
    handleAddPostTopic({state, commit}) {
      return new Promise((resolve, reject) => {
        addPostTopic(state.addTopicPostId, state.addTopic).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleDeletePostTopic({state, commit}) {
      return new Promise((resolve, reject) => {
        deletePostTopic(state.deleteTopicPostId, state.deleteTopic).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
