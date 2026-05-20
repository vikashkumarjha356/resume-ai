const isDevMode = import.meta.env.VITE_BYPASS_AUTH_LIMITS === 'true';

export const ENV = {
  API_BASE_URL: isDevMode 
    ? (import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:5001/api')
    : (import.meta.env.VITE_API_BASE_URL || 'https://resume-ai-backend-0xu6.onrender.com/api'),
  BYPASS_AUTH_LIMITS: import.meta.env.VITE_BYPASS_AUTH_LIMITS === 'true',
};
