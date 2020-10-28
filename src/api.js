/* eslint-disable no-alert, no-console */
import axios from "axios";

export const createApi = () => {
  const api = axios.create({
    baseURL: ``,
    timeout: 5000,
    withCredentials: true
  });

  const onSussess = (response) => {
    return response;
  };

  const onFail = (err) => {

    throw err;
  };

  api.interceptors.response.use(onSussess, onFail);

  return api;
};

