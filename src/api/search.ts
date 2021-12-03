import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

export const getTags = (keyword: string) : AxiosPromise<ResponseInterface> => {
    const data = {
        keyword: keyword,
    };
    return axios.request({
      url: 'search/search_tag',
      data,
      method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};

export const searchKeyword = (keyword: string) : AxiosPromise<ResponseInterface> => {
    const data = {
        keyword: keyword,
    };
    return axios.request({
      url: 'search/search_keyword',
      data,
      method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};

export const searchAuthor = (author: string) : AxiosPromise<ResponseInterface> => {
    const data = {
        author: author,
    };
    return axios.request({
      url: 'search/search_author',
      data,
      method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};

export const searchAddress = (city: string , district: string , province: string , street: string) : AxiosPromise<ResponseInterface> => {
    const data = {
        city: city,
        district: district,
        province: province,
        street: street,
    };
    return axios.request({
      url: 'search/search_address',
      data,
      method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};

export const searchLocation = (longitude:number,latitude:number,radius:number) : AxiosPromise<ResponseInterface> => {
    const data = {
      longitude: longitude,
      latitude: latitude,
      radius: radius
    };
    return axios.request({
      url: 'search/search_location',
      data,
      method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
}

export const searchTags = (tag: Array<string>) : AxiosPromise<ResponseInterface> => {
    const data = {
        tag: tag,
    };
    return axios.request({
      url: 'search/search_tags',
      data,
      method: 'GET',
    }) as AxiosPromise<ResponseInterface>;
};



  