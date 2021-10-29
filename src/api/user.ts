import axios from './index';
import { AxiosPromise } from 'axios';

interface ResponseInterface {
  code: string;
  data: any;
  message: string;
}

interface LoginReqArguInterface {
  identification: string;
  password: number | string;
}
export const loginReq = (data: LoginReqArguInterface): AxiosPromise<ResponseInterface> => {
  return axios.request({
    url: '/user/login',
    data,
    method: 'POST',
  }) as AxiosPromise<ResponseInterface>;
};
