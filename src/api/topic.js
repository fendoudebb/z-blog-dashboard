import axios from '@/libs/axios'
import {topicListUrl, topicUpsertUrl} from '@/api/url';

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

export const upsertTopic = (id, name, sort) => {
  const data = {
    id,
    name,
    sort
  };
  return axios.request({
    url: topicUpsertUrl,
    data,
    method: 'post'
  })
};
