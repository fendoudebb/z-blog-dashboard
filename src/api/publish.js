import axios from '@/libs/axios'
import {articleInfoUrl, publishArticleUrl, editArticleUrl, previewEditArticleUrl} from './url';

export const articleInfo = (data) => {
  return axios.request({
    url: articleInfoUrl,
    data,
    method: 'post'
  })
};

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

export const previewEditArticle = (data) => {
  return axios.request({
    url: previewEditArticleUrl,
    data,
    method: 'post'
  })
};

