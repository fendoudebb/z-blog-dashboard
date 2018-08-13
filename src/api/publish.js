import axios from '@/libs/axios'
import {publishArticleUrl} from './url';

export const publishArticle = (data) => {
  return axios.request({
    url: publishArticleUrl,
    data,
    method: 'post'
  })
};

