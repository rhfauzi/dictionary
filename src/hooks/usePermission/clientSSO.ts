/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-shadow */
import axios from 'axios';
import { getInterceptorsRequest } from '../useReport/config';

export const clientSSO = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MENU_URL_DEV_SSO, // YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json, multipart/form-data',
  },
});

clientSSO.interceptors.request.use(
  (config) => {
    config = getInterceptorsRequest(config);

    config.params.company_id = localStorage.getItem('companyCode');
    return config;
  },
);

clientSSO.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      localStorage.clear();
      const location: any = window.location
      location.assign(location);
      return Promise.reject({ message: 'Please re-authenticate.' });
    }
    return res.data;
  },
  (err) => {
    // if (err.response && err.response.status === 401) {
    //   localStorage.clear();
    //   const location: any = window.location
    //   location.assign(location);
    // }
    return Promise.reject(err);
  },
);
export default clientSSO;