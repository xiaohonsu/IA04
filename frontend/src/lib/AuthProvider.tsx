import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/api/axios';
import { setAccessToken as setAccessTokenMem, getRefreshToken, setRefreshToken, clearTokens } from './auth';

interface AuthContextValue {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  tryRefresh: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const res = await api.post('/auth/refresh', { refreshToken });
          const { accessToken: newAccess, refreshToken: newRefresh } = res.data;
          setAccessToken(newAccess);
          setAccessTokenMem(newAccess);
          if (newRefresh) setRefreshToken(newRefresh);
        } catch (err) {
          // refresh failed
          clearTokens();
        }
      }
      setLoading(false);
    };

    init();
  }, []);

  const login = (access: string, refresh: string) => {
    setAccessToken(access);
    setAccessTokenMem(access);
    setRefreshToken(refresh);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = async () => {
    const refresh = getRefreshToken();
    if (refresh) {
      try {
        await api.post('/auth/logout', { refreshToken: refresh });
      } catch (err) {
        // ignore
      }
    }
    clearTokens();
    setAccessToken(null);
  };

  const tryRefresh = async () => {
    const refresh = getRefreshToken();
    if (!refresh) return false;
    try {
      const res = await api.post('/auth/refresh', { refreshToken: refresh });
      const { accessToken: newAccess, refreshToken: newRefresh } = res.data;
      setAccessToken(newAccess);
      setAccessTokenMem(newAccess);
      if (newRefresh) setRefreshToken(newRefresh);
      return true;
    } catch (err) {
      clearTokens();
      setAccessToken(null);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated: !!accessToken, loading, login, logout, tryRefresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
