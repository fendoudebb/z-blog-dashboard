import axios from '@/libs/axios'
import {linksUrl, linksModifySortUrl, linksAddUrl, linksEditUrl, linksAuditUrl} from './url';

export const getLinksList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: linksUrl,
    data,
    method: 'post'
  })
};

export const modifyLinkSort = (linkId, sort) => {
  const data = {
    linkId,
    sort
  };
  return axios.request({
    url: linksModifySortUrl,
    data,
    method: 'post'
  })
};

export const addNewLink = (websiteName, link, owner, ownerEmail) => {
  const data = {
    websiteName,
    link,
    owner,
    ownerEmail,
  };
  return axios.request({
    url: linksAddUrl,
    data,
    method: 'post'
  })
};

export const editLink = (linkId, websiteName, link, owner, ownerEmail) => {
  const data = {
    linkId,
    websiteName,
    link,
    owner,
    ownerEmail,
  };
  return axios.request({
    url: linksEditUrl,
    data,
    method: 'post'
  })
};

export const auditLink = (linkId, status) => {
  const data = {
    linkId,
    status
  };
  return axios.request({
    url: linksAuditUrl,
    data,
    method: 'post'
  })
};
