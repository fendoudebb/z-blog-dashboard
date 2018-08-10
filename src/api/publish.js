import axios from '@/libs/axios'
import {publishArticleUrl} from './url';

export const publishArticle = (title, content) => {
  const data = {
    title,
    content
  };
  return axios.request({
    url: publishArticleUrl,
    data,
    method: 'post'
  })
};

