import axios from '@/libs/axios'
import {ipUnrecognizedListUrl} from './url';

export const getIpUnrecognizedList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: ipUnrecognizedListUrl,
    data,
    method: 'post'
  })
};
