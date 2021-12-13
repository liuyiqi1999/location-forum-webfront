import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

export const getQuestion = (id: string): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/' + id,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const getAnswerByPage = (
  postId: number,
  page: number,
  size: number
): AxiosPromise<ResponseInterface> => {
  const params = {
    postId,
    page,
    size,
  };
  return axios.request({
    url: '/post/answer/' + postId,
    method: 'GET',
    params: params,
  }) as AxiosPromise<ResponseInterface>;
};

export const getMyQuestion = (id: string): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/owner/' + id,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const getMyAnswer = (
  replierId: string
): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/reply/' + replierId,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const postQuestion = (data: {
  title: string;
  content: string;
  owner_id: number;
  tagsList: string[];
  longitude: number;
  latitude: number;
  city: string;
  district: string;
  province: string;
  street: string;
}): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/question/add',
    method: 'POST',
    data,
  }) as AxiosPromise<ResponseInterface>;
};

export const postAnswer = (data: {
  post_id: string | number;
  owner_id: string | number;
  content: string;
  longitude: number;
  latitude: number;
  city: string;
  district: string;
  province: string;
  street: string;
}): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/question/answer/add',
    method: 'POST',
    data,
  }) as AxiosPromise<ResponseInterface>;
};

export const postComment = (data: {
  post_id: number;
  block_id: number;
  owner_id: number;
  content: string;
  longitude: number;
  latitude: number;
  city: string;
  district: string;
  province: string;
  street: string;
}): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/question/comment/add',
    method: 'POST',
    data,
  }) as AxiosPromise<ResponseInterface>;
};
export const reportQuestion = (id: number): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/question/reported/' + id,
    method: 'PUT',
  }) as AxiosPromise<ResponseInterface>;
};
export const reportAnswer = (id: number): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/answer/reported/' + id,
    method: 'PUT',
  }) as AxiosPromise<ResponseInterface>;
};
export const reportComment = (id: number): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/comment/reported/' + id,
    method: 'PUT',
  }) as AxiosPromise<ResponseInterface>;
};

export const getFrequentlyUsedTags = (): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/ranking/tag',
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const getRandomPostId = (): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/post/random',
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};
