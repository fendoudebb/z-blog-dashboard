import axios from '@/libs/axios'
import {messageBoardUrl, deleteMessageUrl, replyMessageUrl} from './url';

export const getMessageBoardList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: messageBoardUrl,
    data,
    method: 'post'
  })
};

export const deleteMessage = (commentId) => {
  const data = {
    commentId
  };
  return axios.request({
    url: deleteMessageUrl,
    data,
    method: 'post'
  })
};

export const replyMessage = (commentId, content) => {
  const data = {
    commentId,
    content
  };
  return axios.request({
    url: replyMessageUrl,
    data,
    method: 'post'
  })
};
