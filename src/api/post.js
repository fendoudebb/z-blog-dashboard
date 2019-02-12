import axios from '@/libs/axios'
import {postListUrl, postAuditUrl, postDraftUrl} from './url';

export const getPostList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: postListUrl,
    data,
    method: 'post'
  })
};

export const getPostDraft = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: postDraftUrl,
    data,
    method: 'post'
  })
};

export const modifyPostStatus = (postId, auditStatus) => {
  const data = {
    postId,
    auditStatus
  };
  return axios.request({
    url: postAuditUrl,
    data,
    method: 'post'
  })
};
