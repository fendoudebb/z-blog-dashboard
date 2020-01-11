import axios from '@/libs/axios'
import {englishListUrl, englishAddUrl, englishUpdateUrl} from './url';

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

export const addEnglish = (word, synonyms, english_phonetic, american_phonetic, translation, example_sentence, sentence_translation, source) => {
  const data = {
    word, synonyms, english_phonetic, american_phonetic, translation, example_sentence, sentence_translation, source
  };
  return axios.request({
    url: englishAddUrl,
    data,
    method: 'post'
  })
};

export const updateEnglish = (wordId, word, synonyms, english_phonetic, american_phonetic, translation, example_sentence, sentence_translation, source) => {
  const data = {
    wordId, word, synonyms, english_phonetic, american_phonetic, translation, example_sentence, sentence_translation, source,
  };
  return axios.request({
    url: englishUpdateUrl,
    data,
    method: 'post'
  })
};
