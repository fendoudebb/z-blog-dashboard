import axios from '@/libs/axios'
import {articleListUrl} from './url';

export const getArticleList = () => {
  return axios.request({
    url: articleListUrl,
    method: 'post'
  })
};
