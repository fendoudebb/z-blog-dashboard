import axios from '@/libs/axios'
import {
  postListUrl,
  postAuditUrl,
  postAddTopicUrl,
  postDeleteTopicUrl,
  postCommentUrl,
  deletePostCommentUrl,
  replyPostCommentUrl,
  postImgUploadUrl
} from './url';

export const getPostList = (post_id, rank_type, page, size) => {
  const data = {
    post_id,
    rank_type,
    page,
    size
  };
  return axios.request({
    url: postListUrl,
    data,
    method: 'post'
  })
};

export const modifyPostStatus = (id, status) => {
  const data = {
    id,
    status
  };
  return axios.request({
    url: postAuditUrl,
    data,
    method: 'post'
  })
};

export const addPostTopic = (post_id, topic) => {
  const data = {
    post_id,
    topic
  };
  return axios.request({
    url: postAddTopicUrl,
    data,
    method: 'post'
  })
};

export const deletePostTopic = (post_id, topic) => {
  const data = {
    post_id,
    topic
  };
  return axios.request({
    url: postDeleteTopicUrl,
    data,
    method: 'post'
  })
};

export const getPostCommentList = (post_id, page, size) => {
  const data = {
    post_id,
    page,
    size,
  };
  return axios.request({
    url: postCommentUrl,
    data,
    method: 'post'
  })
};

export const deletePostComment = (post_id, comment_id) => {
  const data = {
    post_id,
    comment_id
  };
  return axios.request({
    url: deletePostCommentUrl,
    data,
    method: 'post'
  })
};

export const replyPostComment = (post_id, comment_id, content) => {
  const data = {
    post_id,
    comment_id,
    content
  };
  return axios.request({
    url: replyPostCommentUrl,
    data,
    method: 'post'
  })
};

export const uploadPostImg = (formData) => {
  return axios.request({
    url: postImgUploadUrl,
    data: formData,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};
