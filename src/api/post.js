import axios from '@/libs/axios'
import {postListUrl, postAuditUrl, postDraftUrl, postAddTopicUrl, postDeleteTopicUrl, postCommentUrl, deletePostCommentUrl} from './url';

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

export const addPostTopic = (postId, topic) => {
  const data = {
    postId,
    topic
  };
  return axios.request({
    url: postAddTopicUrl,
    data,
    method: 'post'
  })
};

export const deletePostTopic = (postId, topic) => {
  const data = {
    postId,
    topic
  };
  return axios.request({
    url: postDeleteTopicUrl,
    data,
    method: 'post'
  })
};

export const getPostCommentList = (postId, page, size) => {
  const data = {
    postId,
    page,
    size,
  };
  return axios.request({
    url: postCommentUrl,
    data,
    method: 'post'
  })
};

export const deletePostComment = (postId, commentId) => {
  const data = {
    postId,
    commentId
  };
  return axios.request({
    url: deletePostCommentUrl,
    data,
    method: 'post'
  })
};
