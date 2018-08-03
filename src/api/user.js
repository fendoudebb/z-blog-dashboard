import axios from '@/libs/axios'
import {loginUrl, logoutUrl} from './url';

export const login = ({username, password}) => {
  let params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  return axios.request({
    url: loginUrl,
    params,
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
};

export const logout = () => {
  return axios.request({
    url: logoutUrl,
    method: 'post'
  })
};
