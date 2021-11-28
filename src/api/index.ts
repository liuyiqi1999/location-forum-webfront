import HttpRequest from '../utils/axios';
export * from '../utils/axios';
export default new HttpRequest();
export interface ResponseInterface {
  code: number;
  data: any;
  message: string;
}
// 将api下的所有文件在index中以xxxApi的方式暴露出去
export * as UserApi from './user';
export * as PostApi from './post';
