import axios from '@/libs/axios'
import {dashboardUserListUrl, dashboardUserUpsertUrl} from '@/api/url';

export const getDashboardUserList = (username, page, size) => {
  const data = {
    username,
    page,
    size
  };
  return axios.request({
    url: dashboardUserListUrl,
    data,
    method: 'post'
  })
};

export const upsertDashboardUser = (id, username, password, roles, status) => {
  const data = {
    id,
    username,
    password,
    roles,
    status
  };
  return axios.request({
    url: dashboardUserUpsertUrl,
    data,
    method: 'post'
  })
};
