import axios from '@/libs/axios'
import {publishArticleUrl, editArticleUrl} from './url';

export const publishArticle = (data) => {
  return axios.request({
    url: publishArticleUrl,
    data,
    method: 'post'
  })
};

export const editArticle = (id, data) => {
  return axios.request({
    url: editArticleUrl + '/' + id,
    data,
    method: 'post'
  })
};

