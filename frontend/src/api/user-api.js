import { base } from '@/axios-api';
import { setToken } from '@/api/token-manager.js';

const loginApi = {
  login: async (email, password) => {
    try {
      const response = await base.post('/login', { email, password });
      const token = response.data.token;
      setToken(token);
      return token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  },
  whoAmI: async () => {
    try {
      const response = await base.get('/whoAmI');
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  },
  // getMe: async () => {
  //
  // }
  // async getMe() {
  //   this.user = await authService.whoAmI()
  // },
};

export { loginApi };
