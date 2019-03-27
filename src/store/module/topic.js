import {getTopicList, addTopic, deleteTopic, modifyTopicSort} from '@/api/topic';

export default {
  state: {
    page: 1,
    size: 10,
    topic: '',
    deleteTopicId: '',
    modifySortTopicId: '',
    topicSort: 0,
  },
  mutations: {
    setTopicListPage(state, page) {
      state.page = page
    },
    setTopic(state, topic) {
      state.topic = topic
    },
    setDeleteTopicId(state, deleteTopicId) {
      state.deleteTopicId = deleteTopicId
    },
    setModifySortTopicId(state, modifySortTopicId) {
      state.modifySortTopicId = modifySortTopicId
    },
    setTopicSort(state, topicSort) {
      state.topicSort = topicSort
    },
  },
  getters: {
    getTopicListSize: state => {
      return state.size;
    }
  },
  actions: {
    handleTopicList({state, commit}) {
      return new Promise((resolve, reject) => {
        getTopicList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleAddTopic({state, commit}) {
      return new Promise((resolve, reject) => {
        addTopic(state.topic).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleDeleteTopic({state, commit}) {
      return new Promise((resolve, reject) => {
        deleteTopic(state.deleteTopicId).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleModifyTopicSort({state, commit}) {
      return new Promise((resolve, reject) => {
        modifyTopicSort(state.modifySortTopicId, state.topicSort).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
