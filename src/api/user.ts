import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

interface LoginReqArguInterface {
  username: string;
  password: number | string;
}
interface RegisterReqArguInterface {
  username: string;
  pw: string;
  mail: string;
  signature: string;
}
export const loginReq = (
  data: LoginReqArguInterface
): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/user/login',
    data,
    method: 'POST',
  }) as AxiosPromise<ResponseInterface>;
};

export const registerReq = (
  data: RegisterReqArguInterface
): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/user/register',
    data,
    method: 'POST',
  }) as AxiosPromise<ResponseInterface>;
}

export const getUserInfo = (id: string): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/user/user/' + id,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const updateUserInfo = (
  id: number,
  mail: string = '',
  signature: string = '',
  pw: string = ''
) => {
  const data = {
    id,
    mail,
    signature,
    pw,
  };
  return axios.request({
    url: 'user/user/update',
    data,
    method: 'PUT',
  }) as AxiosPromise<ResponseInterface>;
};
