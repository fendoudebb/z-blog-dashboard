import axios from '@/libs/axios'
import {pageViewListUrl, pageViewInvalidListUrl} from '@/api/url';

export const getPageViewList = (type, page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: type === 0 ? pageViewListUrl : pageViewInvalidListUrl,
    data,
    method: 'post'
  })
};
