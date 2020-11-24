import axios from '@/libs/axios'
import {searchRecordListUrl} from '@/api/url';

export const getSearchRecordList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: searchRecordListUrl,
    data,
    method: 'post'
  })
};
