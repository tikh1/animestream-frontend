import api from './axios';
import { AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requireAuth?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Auth endpoints
export const login = (credentials: { email: string; password: string }) => 
  api.post(`${API_BASE}/login`, credentials);

export const register = (userData: { name: string; email: string; password: string; confirmPassword: string }) => 
  api.post(`${API_BASE}/register`, userData);

// User endpoints
export const getMe = () => 
  api.get(`${API_BASE}/profile`, {
    requireAuth: true
  } as CustomAxiosRequestConfig);

export const getProfile = (username: string) => 
  api.get(`${API_BASE}/profile/${username}`)

// export const getProfile = (username: string) => 
//   api.get(`${API_BASE}/profile/${username}`, {
//     requireAuth: true
//   } as CustomAxiosRequestConfig);


export const updateProfile = (data: any) => 
  api.put(`${API_BASE}/profile`, data, {
    requireAuth: true
  } as CustomAxiosRequestConfig);

export const updateAvatar = (formData: FormData) => 
  api.post(`${API_BASE}/user/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    requireAuth: true
  } as CustomAxiosRequestConfig);

// Anime endpoints
export const getAnimes = (params?: any) => 
  api.get(`${API_BASE}/anime`, { params });

export const getAnime = (slug: string) => 
  api.get(`${API_BASE}/anime/${slug}`);

export const getAnimeEpisodes = (slug: string, episodeSlug: string) => 
  api.get(`${API_BASE}/anime/${slug}/episode/${episodeSlug}`);

// Blog endpoints
export const getBlogs = (params?: any) => 
  api.get(`${API_BASE}/blog`, { params });

export const getBlog = (id: number) => 
  api.get(`${API_BASE}/blog/${id}`);

export const postComment = (commentData: { 
  comment: string; 
  anime_id: number; 
  parent_id?: number | null 
}) => 
  api.post(`${API_BASE}/anime/comment`, commentData, {
    requireAuth: true
  } as CustomAxiosRequestConfig);

export const postEpisodeComment = (commentData: { 
  comment: string; 
  episode_id: number; 
  parent_id?: number | null 
}) => 
  api.post(`${API_BASE}/episode/comment`, commentData, {
    requireAuth: true
  } as CustomAxiosRequestConfig);

export const updateComment = (commentId: number, commentData: { 
  comment: string 
}) => 
  api.put(`${API_BASE}/anime/comment/${commentId}`, commentData, {
    requireAuth: true
  } as CustomAxiosRequestConfig);

export const deleteComment = (commentId: number) => 
  api.delete(`${API_BASE}/anime/comment/${commentId}`, {
    requireAuth: true
  } as CustomAxiosRequestConfig);

// Test endpoint
export const testApi = () => 
  api.get(`${API_BASE}/test`);
