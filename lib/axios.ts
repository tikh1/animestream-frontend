import axios, { AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requireAuth?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // if requireAuth is true, add Authorization header and bearer token
      if ((config as CustomAxiosRequestConfig).requireAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // token geçersiz veya süresi dolmuş
      localStorage.removeItem('token');
      // Kullanıcıyı login sayfasına yönlendir
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 