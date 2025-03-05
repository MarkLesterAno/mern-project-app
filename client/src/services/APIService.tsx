import axios from 'axios';
import Config from '../config';
class APIService {
    protected client: any;
    loading: boolean;
    error: null;
    access_token: any;
    refresh_token: string;

    constructor() {

        this.loading = false;
        this.access_token = '';
        this.refresh_token = '';
        this.error = null;

        const access_token = localStorage.getItem('access_token')
        const user: any = localStorage.getItem('user')

        // Add request interceptors
        axios.interceptors.request.use(
            (config: any) => {
                this.loading = true;
                config.baseURL = Config.API_BASEURL

                if (access_token && access_token.length > 0 && access_token !== undefined) {
                    config.headers.Authorization = `Bearer ${access_token}`
                }
                config.headers["Access-Control-Allow-Origin"] = "*";
                config.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";
                config.headers["X-Frame-Options"] = 'DENY';

                return config;
            },
            (error: any) => {
                this.loading = false;
                return Promise.reject(error);
            }
        );

        // Add response interceptors
        axios.interceptors.response.use(
            (response) => {
                this.loading = false;
                return response;
            },
            async (error) => {
                const originalRequest = error?.config;

                const _user = JSON.parse(user)

                if (error?.response?.status === 401 && !originalRequest._retry) {

                    originalRequest._retry = true

                    try {
                        const result: any = await axios.post(`/auth/token/refresh/`, {
                            'refresh_token': _user.refresh_token
                        });
                        
                        const access = result.data['access_token']
                        localStorage.setItem('access_token', access)
                        axios.defaults.headers.common['Authorization'] = `Bearer  ${access}`

                        return axios(originalRequest)
                    }
                    catch (_error: any) {
                        if (_error?.response && _error?.response?.data) {
                            return Promise.reject(_error.response.data);
                        }
                        return Promise.reject(_error);
                    }

                }
                return Promise.reject(error);
            }
        );
    }

    async get(url: any, config = {}) {
        return await axios.get(url, config)
    }
    async post(url: any, data: any, config = {}) {
        return await axios.post(url, data, config);
    }
    async put(url: any, data: any, config = {}) {
        return await axios.put(url, data, config);
    }
    async patch(url: any, data: any, config = {}) {
        return await axios.patch(url, data, config);
    }
    async delete(url: any, config = {}) {
        return await axios.delete(url, config);
    }

    // Add more HTTP methods as needed

}

export default APIService;
