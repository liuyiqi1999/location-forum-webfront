import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

export const getReported = (page: number, size: number, userId: number, type: number): AxiosPromise<ResponseInterface> => {
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
        url: '/admin/report/'+requestType,
        params,
        method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};

export const solveReported = (operation: number, userId: number, type: number , id:number): AxiosPromise<ResponseInterface> => {
    var requestType;
    switch (type) {
        case 0: requestType = "Questions"; break;
        case 1: requestType = "Answers"; break;
        case 2: requestType = "Comments"; break;
    }
    const data = {
        operation:operation,
        userId:userId,
    };
    return axios.request({
        url: '/admin/reverse'+requestType+'/'+id,
        data,
        method: 'PUT',
    }) as AxiosPromise<ResponseInterface>;
};