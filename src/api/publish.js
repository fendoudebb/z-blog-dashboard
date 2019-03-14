import axios from '@/libs/axios'
import {postInfoUrl, publishPostUrl, editPostUrl} from './url';

export const postInfo = (data) => {
  return axios.request({
    url: postInfoUrl,
    data,
    method: 'post'
  })
};

export const publishPost = (data) => {
  return axios.request({
    url: publishPostUrl,
    data,
    method: 'post'
  })
};

export const editPost = (data) => {
  return axios.request({
    url: publishPostUrl,
    data,
    method: 'post'
  })
};

