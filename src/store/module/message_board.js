import {getMessageBoardList, deleteMessage} from '@/api/message_board';

export default {
  state: {
    page: 1,
    size: 10,
    messageId:''
  },
  mutations: {
    setMessageBoardListPage(state, page) {
      state.page = page
    },
    setMessageId(state, messageId) {
      state.messageId = messageId
    },
  },
  getters: {
    getMessageBoardListSize: state => {
      return state.size;
    }
  },
  actions: {
    handleMessageBoardList({state, commit}) {
      return new Promise((resolve, reject) => {
        getMessageBoardList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleDeleteMessage({state, commit}) {
      return new Promise((resolve, reject) => {
        deleteMessage(state.messageId).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
