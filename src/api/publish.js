import axios from '@/libs/axios'
import {publishArticleUrl} from './url';

export const publishArticle = ({articleDetail}) => {
  const data = {
    title: articleDetail.title,
    content: articleDetail.content
  };
  return axios.request({
    url: publishArticleUrl,
    data,
    method: 'post'
  })
};

