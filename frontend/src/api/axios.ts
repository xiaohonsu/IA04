import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, clearTokens } from '@/lib/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

let isRefreshing = false;
let refreshCall: Promise<string | null> | null = null;

async function doRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
    const { accessToken, refreshToken: newRefresh } = res.data;
    setAccessToken(accessToken);
    if (newRefresh) {
      // update persistent refresh token
      localStorage.setItem('refreshToken', newRefresh);
    }
    return accessToken;
  } catch (err) {
    clearTokens();
    return null;
  }
}

// Request interceptor to attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 -> try refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshCall = doRefresh();
      }

      const newToken = await refreshCall;
      isRefreshing = false;
      refreshCall = null;

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
