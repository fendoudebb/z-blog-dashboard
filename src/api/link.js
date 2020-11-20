import axios from '@/libs/axios'
import {linkListUrl, linkUpsertUrl, linkAuditUrl} from '@/api/url';

export const getLinkList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: linkListUrl,
    data,
    method: 'post'
  })
};

export const upsertLink = (id, website, url, webmaster, webmaster_email, sort) => {
  const data = {
    id,
    website,
    url,
    webmaster,
    webmaster_email,
    sort,
  };
  return axios.request({
    url: linkUpsertUrl,
    data,
    method: 'post'
  })
};

export const auditLink = (id, status) => {
  const data = {
    id,
    status
  };
  return axios.request({
    url: linkAuditUrl,
    data,
    method: 'post'
  })
};
