import {getPostCommentList, deletePostComment} from '@/api/post';

export default {
  state: {
    postId: '',
    commentId:'',
    page: 1,
    size: 10,
  },
  mutations: {
    setCommentPostId(state, postId) {
      state.postId = postId
    },
    setCommentId(state, commentId) {
      state.commentId = commentId
    },
    setPostCommentListPage(state, page) {
      state.page = page
    },
  },
  getters: {
    getPostCommentListSize: state => {
      return state.size;
    }
  },
  actions: {
    handlePostCommentList({state, commit}) {
      return new Promise((resolve, reject) => {
        getPostCommentList(state.postId, state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleDeletePostComment({state, commit}) {
      return new Promise((resolve, reject) => {
        deletePostComment(state.postId, state.commentId).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    }
  },

}
