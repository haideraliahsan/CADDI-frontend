class AccessTokenService {
    static getAccessToken(): string | null {
      return typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    }
  
    static saveAccessToken(token: string) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
      }
    }
  
    static getRefreshToken(): string | null {
      return typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
    }
  
    static saveRefreshToken(token: string) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', token);
      }
    }
  
    static clearTokens() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }
  
  export default AccessTokenService;
  