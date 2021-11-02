import axios from './index';
import { AxiosPromise } from 'axios';

export interface ResponseInterface {
  code: number;
  data: any;
  message: string;
}

interface LoginReqArguInterface {
  username: string;
  password: number | string;
}
const loginReq = (
  data: LoginReqArguInterface
): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/user/login',
    data,
    method: 'POST',
  }) as AxiosPromise<ResponseInterface>;
};

const getUserInfo = (id: string): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/user/user/' + id,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

const updateUserInfo = (
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
export { getUserInfo, loginReq, updateUserInfo };
