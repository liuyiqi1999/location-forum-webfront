import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

export const getUnreadMessage = (
  id: number
): AxiosPromise<ResponseInterface> => {
  const params = {
    id,
  };
  return axios.request({
    url: '/notice/unread',
    method: 'GET',
    params: params,
  }) as AxiosPromise<ResponseInterface>;
};
export const getUnreadMessageNum = (
  id: number
): AxiosPromise<ResponseInterface> => {
  const params = {
    id,
  };
  return axios.request({
    url: '/notice/unreadNum',
    method: 'GET',
    params: params,
  }) as AxiosPromise<ResponseInterface>;
};

export const getReadMessage = (id: number): AxiosPromise<ResponseInterface> => {
  const params = {
    id,
  };
  return axios.request({
    url: '/notice/read',
    method: 'GET',
    params: params,
  }) as AxiosPromise<ResponseInterface>;
};

export const setMessageToRead = (
  id: number
): AxiosPromise<ResponseInterface> => {
  const data = {
    id,
  };
  return axios.request({
    url: '/notice',
    method: 'PUT',
    data,
  }) as AxiosPromise<ResponseInterface>;
};
