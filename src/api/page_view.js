import axios from '@/libs/axios'
import {pageViewListUrl} from './url';

export const getPageViewList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: pageViewListUrl,
    data,
    method: 'post'
  })
};
