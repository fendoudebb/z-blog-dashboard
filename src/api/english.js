import axios from '@/libs/axios'
import {englishListUrl, englishUpsertUrl} from '@/api/url';

export const getEnglishList = (word, page, size) => {
  const data = {
    word,
    page,
    size
  };
  return axios.request({
    url: englishListUrl,
    data,
    method: 'post'
  })
};

export const upsertEnglish = (id, word, synonyms, english_phonetic, american_phonetic, translation, example_sentence, sentence_translation, source) => {
  const data = {
    id, word, synonyms, english_phonetic, american_phonetic, translation, example_sentence, sentence_translation, source,
  };
  return axios.request({
    url: englishUpsertUrl,
    data,
    method: 'post'
  })
};
