import axios from 'axios'

export const login = ({userName, password}) => {
  const data = {
    userName,
    password
  };
  return axios.request({
    url: '/login',
    data,
    method: 'post'
  })
};

export const logout = (useId) => {
  return axios.request({
    url: '/logout',
    method: 'post'
  })
};
