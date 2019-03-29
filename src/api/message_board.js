import axios from '@/libs/axios'
import {messageBoardUrl, deleteMessageUrl} from './url';

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
