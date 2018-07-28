import axios from 'axios'

export const login = ({userName, password}) => {
  const data = {
    userName,
    password
  };
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
};

export const getUserInfo = (useId) => {
  return axios.request({
    url: 'get_info',
    /*params: {
      token
    },*/
    method: 'get'
  })
};

export const logout = (useId) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
};
