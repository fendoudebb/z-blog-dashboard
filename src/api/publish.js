import axios from 'axios'

export const publishArticle = ({articleDetail}) => {
  const data = {
    title:articleDetail.title,
    content:articleDetail.content
  };
  return axios.request({
    url: 'article/publish',
    data,
    method: 'post'
  })
};

