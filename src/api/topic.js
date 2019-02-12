import axios from '@/libs/axios'
import {topicListUrl} from './url';

export const getTopicList = () => {
  let data = {
    'topicParentId':0
  };
  return axios.request({
    url: topicListUrl,
    data,
    method: 'post'
  })
};
