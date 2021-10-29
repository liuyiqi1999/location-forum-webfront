import axios from './index';
import { AxiosPromise } from 'axios';
interface LoginReqArguInterface {
  identification: string;
  password: number | string;
}
export const loginReq = (data: LoginReqArguInterface): AxiosPromise => {
  return axios.request({
    url: '/user/login',
    data,
    method: 'POST',
  });
};
