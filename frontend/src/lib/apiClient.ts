// lib/apiClient.ts
import { tokenManager } from './tokenManager';
import axios, {AxiosError, AxiosRequestConfig} from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080',
    withCredentials: true, // 쿠키 포함
});

apiClient.interceptors.request.use(
    async (config) => {
        let accessToken = tokenManager.getAccessToken();

        // Access Token이 있고 곧 만료될 예정이라면 미리 갱신
        if (accessToken && tokenManager.isTokenExpiringSoon(accessToken)) {
            try {
                accessToken = await tokenManager.refreshAccessToken();
            } catch (error) {
                console.error('Token refresh failed:', error);
            }
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response 인터셉터: 401 에러 시 토큰 갱신 시도
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh Token으로 Access Token 갱신
                const newAccessToken = await tokenManager.refreshAccessToken();

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
