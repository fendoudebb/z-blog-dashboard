import {postInfo, editPost, publishPost} from '@/api/publish';

export default {
  state: {
    editPostId: -1,
    title: '',
    content: '',
    postIsPrivate: 0,
    topic: '',
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
    setTopic(state, topic) {
      state.topic = topic
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
          topic: state.topic,
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
          topic: state.topic,
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
