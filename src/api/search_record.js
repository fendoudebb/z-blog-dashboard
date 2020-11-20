import axios from '@/libs/axios'
import {searchRecordListUrl, searchRecordWxListUrl} from '@/api/url';

export const getSearchRecordList = (type, page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: type === 0 ? searchRecordListUrl : searchRecordWxListUrl,
    data,
    method: 'post'
  })
};
