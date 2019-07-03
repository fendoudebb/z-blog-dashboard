import axios from '@/libs/axios'
import {ipUnrecognizedListUrl, queryUnrecognizedIp} from './url';

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

export const getUnrecognizedIp = (unrecognizedIp) => {
  const data = {
    ip:unrecognizedIp
  };
  return axios.request({
    url: queryUnrecognizedIp,
    data,
    method: 'post'
  })
};
