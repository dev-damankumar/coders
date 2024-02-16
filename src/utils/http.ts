import axios, {
  AxiosHeaderValue,
  AxiosHeaders,
  RawAxiosRequestHeaders,
} from 'axios';
import { baseURL } from '../constants';

type NetHeaders =
  | AxiosHeaders
  | Partial<
      RawAxiosRequestHeaders & {
        Authorization: AxiosHeaderValue;
        'Content-Length': AxiosHeaderValue;
        'Content-Encoding': AxiosHeaderValue;
        Accept: AxiosHeaderValue;
        'User-Agent': AxiosHeaderValue;
      } & {}
    >
  | undefined;
const token = localStorage.getItem('token');
const defaultHeaders: NetHeaders = {};
if (token) {
  defaultHeaders.Authorization = `Bearer ${token}`;
}

const http = axios.create({
  baseURL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    ...defaultHeaders,
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http;
