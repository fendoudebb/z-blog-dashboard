import axios from '@/libs/axios'
import {articleListUrl} from './url';

export const getArticleList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: articleListUrl,
    data,
    method: 'post'
  })
};
