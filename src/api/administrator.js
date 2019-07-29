import axios from '@/libs/axios'
import {administratorInfoUrl, administratorAddUrl} from './url';

export const getAdministratorList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: administratorInfoUrl,
    data,
    method: 'post'
  })
};
