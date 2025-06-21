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
        if (!token) {
          // token yoksa hata at
          const error = new Error('Bu sayfaya erişmek için giriş yapmanız gerekmektedir.');
          error.name = 'NoTokenError';
          return Promise.reject(error);
        }
        config.headers.Authorization = `Bearer ${token}`;
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
    if (error.name === 'NoTokenError') {
      // token hiç yoksa login sayfasına yönlendir
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      // token geçersiz veya süresi dolmuş
      localStorage.removeItem('token');
      // kullanıcıyı login sayfasına yönlendir
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 