import axios, { AxiosRequestConfig } from 'axios';
import AccessTokenService from './AccessTokenService';
import ApiEndpoints from './ApiEndpoints';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthHeaders = () => {
  const token = AccessTokenService.getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const apiService = axios.create({
  baseURL: baseUrl,
});

// Request Interceptor to add headers dynamically before every request
apiService.interceptors.request.use(
  config => {
    config.headers = {
      ...(config.headers || {}),
      ...getAuthHeaders(),
    };
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor for handling unauthorized responses
apiService.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      AccessTokenService.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Utility Methods
export const getRequest = (endpoint: string, options: AxiosRequestConfig = {}) =>
  apiService.get(endpoint, options);

export const postRequest = (endpoint: string, body: any, options: AxiosRequestConfig = {}) =>
  apiService.post(endpoint, body, options);

export const putRequest = (endpoint: string, body: any, options: AxiosRequestConfig = {}) =>
  apiService.put(endpoint, body, options);

export const deleteRequest = (endpoint: string, options: AxiosRequestConfig = {}) =>
  apiService.delete(endpoint, options);

export const uploadFileRequest = (
  endpoint: string,
  file: File,
  additionalData: Record<string, any> = {},
  options: AxiosRequestConfig = {}
) => {
  const formData = new FormData();
  formData.append('file', file);
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return apiService.post(endpoint, formData, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...getAuthHeaders(),
      'Content-Type': 'multipart/form-data',
    },
  });
};
