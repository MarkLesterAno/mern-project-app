import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from '../config';

class APIService {
    private client: AxiosInstance;
    private activeRequests = 0;
    private error: any;

    constructor() {
        this.error = null;

        this.client = axios.create({
            baseURL: Config.API_BASEURL,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
                "X-Frame-Options": "DENY",
            },
        });

        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    private initializeRequestInterceptor() {
        this.client.interceptors.request.use(
            (config: any) => {
                this.activeRequests++;
                const accessToken = this.getAccessToken();
                if (accessToken) {
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${accessToken}`,
                    };
                }
                return config;
            },
            (error) => {
                this.activeRequests = Math.max(this.activeRequests - 1, 0);
                return Promise.reject(error);
            }
        );
    }

    private initializeResponseInterceptor() {
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                this.activeRequests = Math.max(this.activeRequests - 1, 0);
                return response;
            },
            async (error) => {
                const originalRequest = error?.config;

                if (error?.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        await this.refreshAccessToken();
                        const accessToken = this.getAccessToken();
                        if (accessToken) {
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            return this.client(originalRequest);
                        }
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    private async refreshAccessToken(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post(`${Config.API_BASEURL}/auth/token/refresh/`, {
                refresh_token: refreshToken,
            });

            const newAccessToken = response.data['access_token'];
            this.setAccessToken(newAccessToken);
        } catch (error) {
            this.setAccessToken(null);
            throw error;
        }
    }

    private getAccessToken(): string | null {
        return localStorage.getItem('access_token');
    }

    private setAccessToken(token: string | null): void {
        if (token) {
            localStorage.setItem('access_token', token);
            this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('access_token');
            delete this.client.defaults.headers.common['Authorization'];
        }
    }

    private getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    private setRefreshToken(token: string | null): void {
        if (token) {
            localStorage.setItem('refresh_token', token);
        } else {
            localStorage.removeItem('refresh_token');
        }
    }

    async get(url: string, config = {}) {
        return this.client.get(url, config);
    }

    async post(url: string, data: any, config = {}) {
        return this.client.post(url, data, config);
    }

    async put(url: string, data: any, config = {}) {
        return this.client.put(url, data, config);
    }

    async patch(url: string, data: any, config = {}) {
        return this.client.patch(url, data, config);
    }

    async delete(url: string, config = {}) {
        return this.client.delete(url, config);
    }
}

export default APIService;
