import axios from '@/libs/axios'
import {rankPvUrl, rankLikesUrl, rankCommentsUrl, replyPostCommentUrl} from './url';

export const getPostPvList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: rankPvUrl,
    data,
    method: 'post'
  })
};

export const getPostLikesList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: rankLikesUrl,
    data,
    method: 'post'
  })
};

export const getPostCommentsList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: rankCommentsUrl,
    data,
    method: 'post'
  })
};

export const replyPostComment = (postId, commentId, replyContent) => {
  const data = {
    postId,
    commentId,
    replyContent
  };
  return axios.request({
    url: replyPostCommentUrl,
    data,
    method: 'post'
  })
};

