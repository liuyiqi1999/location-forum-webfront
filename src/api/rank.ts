import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

export const getAllRank = (): AxiosPromise<ResponseInterface> => {
    return axios.request({
        url: '/ranking/post',
        method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};

export const getLocationRank = (
    longitude: number,
    latitude: number
): AxiosPromise<ResponseInterface> => {
    const params = {
        longitude,
        latitude,
    }
    return axios.request({
        url: '/ranking/post/nearby',
        method: 'GET',
        params
    }) as AxiosPromise<ResponseInterface>;
};
