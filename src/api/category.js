import axios from '@/libs/axios'
import {categoryListUrl} from './url';

export const getCategoryList = () => {
  return axios.request({
    url: categoryListUrl,
    method: 'post'
  })
};
