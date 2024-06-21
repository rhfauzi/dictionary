import axios from 'axios';
import { getInterceptorsRequest } from '../useReport/config';

export const clientMDM = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Content-Type': 'application/json, multipart/form-data',
    },
});

clientMDM.interceptors.request.use(
    (config) => {
        config = getInterceptorsRequest(config);

        config.params.company_id = localStorage.getItem('companyCode');
        return config;
    },
);

clientMDM.interceptors.response.use(
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
export default clientMDM;