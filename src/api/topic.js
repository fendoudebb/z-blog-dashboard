import axios from '@/libs/axios'
import {topicListUrl, topicAddUrl, topicDeleteUrl, topicUpdateUrl} from './url';

export const getTopicList = (name, page, size) => {
  const data = {
    name,
    page,
    size
  };
  return axios.request({
    url: topicListUrl,
    data,
    method: 'post'
  })
};

export const addTopic = (name) => {
  const data = {
    name
  };
  return axios.request({
    url: topicAddUrl,
    data,
    method: 'post'
  })
};

export const updateTopic = (id, name, sort) => {
  const data = {
    id,
    name,
    sort
  };
  return axios.request({
    url: topicUpdateUrl,
    data,
    method: 'post'
  })
};
