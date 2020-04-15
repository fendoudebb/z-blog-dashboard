import axios from '@/libs/axios'
import {messageBoardListUrl, messageBoardAuditUrl, messageBoardReplyUrl, messageBoardReplyListUrl} from "@/api/url";

export const getMessageBoardList = (page, size) => {
  const data = {
    page,
    size
  };
  return axios.request({
    url: messageBoardListUrl,
    data,
    method: 'post'
  })
};

export const getMessageBoardReplyList = (id, page, size) => {
  const data = {
    id,
    page,
    size
  };
  return axios.request({
    url: messageBoardReplyListUrl,
    data,
    method: 'post'
  })
};

export const auditMessageBoard = (id, status) => {
  const data = {
    id,
    status
  };
  return axios.request({
    url: messageBoardAuditUrl,
    data,
    method: 'post'
  })
};

export const replyMessageBoard = (reply_id, content) => {
  const data = {
    reply_id,
    content
  };
  return axios.request({
    url: messageBoardReplyUrl,
    data,
    method: 'post'
  })
};
