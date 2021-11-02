import HttpRequest from '../utils/axios';
export * from '../utils/axios';
export default new HttpRequest();
// 将api下的所有文件在index中以xxxApi的方式暴露出去
export * as UserApi from './user';
