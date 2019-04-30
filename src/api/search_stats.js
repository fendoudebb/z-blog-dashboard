import axios from '@/libs/axios'
import {searchStatsListUrl} from './url';

export const getSearchStatsList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: searchStatsListUrl,
    data,
    method: 'post'
  })
};
