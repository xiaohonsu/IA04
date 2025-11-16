let accessTokenInMemory: string | null = null;

export function setAccessToken(token: string | null) {
  accessTokenInMemory = token;
}

export function getAccessToken(): string | null {
  return accessTokenInMemory;
}

export function setRefreshToken(token: string | null) {
  if (token) {
    localStorage.setItem('refreshToken', token);
  } else {
    localStorage.removeItem('refreshToken');
  }
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function clearTokens() {
  accessTokenInMemory = null;
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
}
