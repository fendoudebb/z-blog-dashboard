import axios from '@/libs/axios'
import {postInfoUrl, publishPostUrl} from '@/api/url';

export const getPostInfo = (id) => {
  const data = {
    id
  };
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

