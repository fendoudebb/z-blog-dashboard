import axios from '@/libs/axios'
import {ipPoolListUrl} from './url';

export const getIpPoolList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: ipPoolListUrl,
    data,
    method: 'post'
  })
};
