import api from './axios';

export interface RegisterData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/user/register', data);
  return response.data;
};

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const logout = async (refreshToken: string) => {
  return api.post('/auth/logout', { refreshToken });
};

export default api;
