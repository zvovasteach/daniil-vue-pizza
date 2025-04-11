const AUTH_KEY = 'vue-pizza-auth-key';

export const getToken = () => localStorage.getItem(AUTH_KEY);

export const setToken = (token) => localStorage.setItem(AUTH_KEY, `Bearer ${token}`);

export const removeToken = () => localStorage.removeItem(AUTH_KEY);
