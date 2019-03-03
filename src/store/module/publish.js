import {postInfo, editPost, publishPost} from '@/api/publish';

export default {
  state: {
    editPostId: '',
    title: '',
    content: '',
    postIsPrivate: 0,
    topics: [],
  },
  mutations: {
    setEditPostId(state, editPostId) {
      state.editPostId = editPostId
    },
    setTitle(state, title) {
      state.title = title
    },
    setContent(state, content) {
      state.content = content
    },
    setPostIsPrivate(state, postProperty) {
      state.postIsPrivate = postProperty
    },
    setTopics(state, topics) {
      state.topics = topics
    }
  },
  getters: {
    getEditPostId: state => {
      return state.editPostId;
    }
  },
  actions: {
    handlePublishPost({state, commit}) {
      return new Promise((resolve, reject) => {
        const data = {
          author: localStorage.getItem('username'),
          title: state.title,
          content: state.content,
          isPrivate: state.postIsPrivate,
          topics: state.topics,
        };
        publishPost(data).then(value => {
          resolve(value);
        }).catch(reason => {
          reject(reason);
        });
      })
    },
    handleEditPost({state, commit}) {
      return new Promise((resolve, reject) => {
        const data = {
          author: localStorage.getItem('username'),
          title: state.title,
          content: state.content,
          postIsPrivate: state.postIsPrivate,
          topics: state.topics,
        };
        editPost(state.editPostId, data).then(value => {
          console.log("editPostId: " + state.editPostId);
          resolve(value);
        }).catch(reason => {
          reject(reason);
        });
      })
    },
    handlePostInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        const data = {
          postId: state.editPostId
        };
        postInfo(data).then(value => {
          console.log("editPostId: " + state.editPostId);
          resolve(value);
        }).catch(reason => {
          reject(reason);
        });
      })
    },
  },

}
