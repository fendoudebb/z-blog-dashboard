import axios from '@/libs/axios'
import {articleListUrl, articleAuditUrl, articleDraftUrl} from './url';

export const getArticleList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: articleListUrl,
    data,
    method: 'post'
  })
};

export const getArticleDraft = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: articleDraftUrl,
    data,
    method: 'post'
  })
};

export const modifyArticleStatus = (articleId, auditStatus) => {
  const data = {
    articleId,
    auditStatus
  };
  return axios.request({
    url: articleAuditUrl,
    data,
    method: 'post'
  })
};
