import axios, { ResponseInterface } from './index';
import { AxiosPromise } from 'axios';

export const getTags = (keyword: string): AxiosPromise<ResponseInterface> => {
  const params = {
    keyword: keyword,
  };
  return axios.request({
    url: 'search/search_tag',
    params,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const searchKeyword = (page: number, size: number, keyword: string): AxiosPromise<ResponseInterface> => {
  const params = {
    page: page,
    size: size,
    keyword: keyword,
  };
  return axios.request({
    url: 'search/search_keyword',
    params,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const searchAuthor = (page: number, size: number, author: string): AxiosPromise<ResponseInterface> => {
  const params = {
    page: page,
    size: size,
    author: author,
  };
  return axios.request({
    url: 'search/search_author',
    params,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const searchAddress = (page: number, size: number, city: string, district: string, province: string, street: string): AxiosPromise<ResponseInterface> => {
  const params = {
    page: page,
    size: size,
    city: city,
    district: district,
    province: province,
    street: street,
  };
  return axios.request({
    url: 'search/search_address',
    params,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};

export const searchLocation = (page: number, size: number, longitude: number, latitude: number, radius: number): AxiosPromise<ResponseInterface> => {
  const params = {
    page: page,
    size: size,
    longitude: longitude,
    latitude: latitude,
    radius: radius
  };
  return axios.request({
    url: 'search/search_location',
    params,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
}

export const searchTags = (page: number, size: number, tags: string): AxiosPromise<ResponseInterface> => {
  const params = {
    page: page,
    size: size,
    tags: tags,
  };
  return axios.request({
    url: 'search/search_tags',
    params,
    method: 'GET',
  }) as AxiosPromise<ResponseInterface>;
};



