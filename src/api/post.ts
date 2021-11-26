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
