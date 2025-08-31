import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const options = {
  baseURL,
  withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error || {};
    const status = response?.status;
    const data = response?.data || {};
    const message = data?.message || error.message || 'Request failed';
    return Promise.reject({ status, message, ...data });
  }
);

export default API;
