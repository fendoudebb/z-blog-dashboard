import {getMessageBoardList, deleteMessage, replyMessage} from '@/api/message_board';

export default {
  state: {
    page: 1,
    size: 10,
    messageId:'',
    replyMessageId:'',
    replyContent:'',
  },
  mutations: {
    setMessageBoardListPage(state, page) {
      state.page = page
    },
    setMessageId(state, messageId) {
      state.messageId = messageId
    },
    setReplyMessageId(state, replyMessageId) {
      state.replyMessageId = replyMessageId
    },
    setReplyContent(state, replyContent) {
      state.replyContent = replyContent
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
    },
    handleReplyMessage({state, commit}) {
      return new Promise((resolve, reject) => {
        replyMessage(state.replyMessageId, state.replyContent).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
