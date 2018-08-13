import {publishArticle} from '@/api/publish';

export default {
  state: {
    title: '',
    content: '',
    articleProperty: '',
    category: '',
    keywords: '',
    description: '',
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setContent (state, content) {
      state.content = content
    },
    setArticleProperty (state, articleProperty) {
      state.articleProperty = articleProperty
    },
    setCategory (state, category) {
      state.category = category
    },
    setKeywords (state, keywords) {
      state.keywords = keywords
    },
    setDescription (state, description) {
      state.description = description
    },
  },
  actions: {
    handlePublishArticle({state, commit}) {
      return new Promise((resolve, reject) => {
        const data = {
          title: state.title,
          content: state.content,
          articleProperty: state.articleProperty,
          category: state.category,
          keywords: state.keywords,
          description: state.description,
        };
        publishArticle(data).then(value => {
          console.log("aaaa");
          resolve(value);
        }).catch(reason => {
          reject(reason);
        });
      })
    }
  },

}
