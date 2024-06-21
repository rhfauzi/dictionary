/* eslint-disable */
import axios, { AxiosResponse } from 'axios'

export const confApiUrl = 'http://10.1.40.30:5001'
export const instance = axios.create({
    baseURL: confApiUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})

// if (typeof window !== undefined) {
//     const TK: any = storage.get({ key: 'TOKEN', stringify: false });
//     if (TK) instance.defaults.headers.common['Authorization'] = TK;
// }

const getInterceptorsRequest = (config: any) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.authorization = `Bearer ${token}`;
    config.headers['X-Company-Id'] = 'PP01';
    config.headers['X-User-Id'] = '1';
    config.params = config.params ?? {};
    return config;
};

instance
    .interceptors
    .request
    .use((config: any) => {
        config = getInterceptorsRequest(config);
        return config;
    })

export const https = {
    get: async (url: string, params?: any) => {
        try {
            const req = await instance.get(url, params).then((res: any) => {
                return res
            })
            return req.data
        } catch (error) {
            throw error
        }
    },
    post: async (url: string, data: any) => {
        try {
            const req: AxiosResponse<any, any> = await instance.post(confApiUrl + url, data)
            return req.data
        } catch (error) {
            throw error
        }
    },
    put: async (url: string, data: any) => {
        try {
            const req: AxiosResponse<any, any> = await instance.put(confApiUrl + url, data)
            return req.data
        } catch (error) {
            throw error
        }
    },
    patch: async (url: string, data: any) => {
        try {
            const req: AxiosResponse<any, any> = await instance.patch(confApiUrl + url, data)
            return req.data
        } catch (error) {
            throw error
        }
    },
    delete: async (url: string, data: any) => {
        try {
            const req: AxiosResponse<any, any> = await instance.delete(confApiUrl + url, { data })
            return req.data
        } catch (error) {
            throw error
        }
    },
    upload: async (url: string, file: File, is_delete: 'false' | 'true') => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('is_delete', is_delete);
            const res: AxiosResponse<any, any> = await instance.post(confApiUrl + url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}
