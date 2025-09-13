// src/api/axios.js
import axios from 'axios';
import { getToken } from '../auth/token';
import { BASE_URL } from '../config';  

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2500,
  headers: {'X-Custom-Header': 'foobar'}
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    console.log("Attaching token to request:", token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("No token found:");
  return config;
}, error => Promise.reject(error));


axiosInstance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response.data: ", response.data);
    console.log("response.status: ", response.status);
    console.log("response.statusText: ", response.statusText);
    console.log("response.headers: ", response.headers);
    console.log("response.config: ", response.config);
    return response;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export { axiosInstance };