import axios from '@/libs/axios'
import {ipPoolListUrl, ipUnknownListUrl} from '@/api/url';

export const getIpPoolList = (ip, page, size) => {
  const data = {
    ip,
    page,
    size
  };
  return axios.request({
    url: ipPoolListUrl,
    data,
    method: 'post'
  })
};

export const getIpUnknownList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: ipUnknownListUrl,
    data,
    method: 'post'
  })
};
