import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

export const getReported = (page: number, size: number, userId: string, type: number): AxiosPromise<ResponseInterface> => {
    var requestType;
    switch (type) {
        case 0: requestType = "questions"; break;
        case 1: requestType = "answers"; break;
        case 2: requestType = "comments"; break;
    }
    const params = {
        page: page,
        size: size,
        userId:userId,
    };
    return axios.request({
        url: '/admin/report/comments',
        params,
        method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};