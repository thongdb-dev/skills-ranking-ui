import axios from 'axios';
import { store } from '@/lib/store';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import { setError } from '@/redux/ui';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {

      }
    }

    store.dispatch(setError(error.response?.data?.error || DEFAULT_ERROR_MESSAGE));

    return Promise.reject(error);
  },
);

export default axiosInstance;
