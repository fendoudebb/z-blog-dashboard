import axios from '@/libs/axios'
import {topicListUrl, topicAddUrl, topicDeleteUrl, topicModifySortUrl} from './url';

export const getTopicList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: topicListUrl,
    data,
    method: 'post'
  })
};

export const addTopic = (topic) => {
  const data = {
    topic
  };
  return axios.request({
    url: topicAddUrl,
    data,
    method: 'post'
  })
};

export const deleteTopic = (topicId) => {
  const data = {
    topicId,
  };
  return axios.request({
    url: topicDeleteUrl,
    data,
    method: 'post'
  })
};

export const modifyTopicSort = (topicId, sort) => {
  const data = {
    topicId,
    sort
  };
  return axios.request({
    url: topicModifySortUrl,
    data,
    method: 'post'
  })
};
