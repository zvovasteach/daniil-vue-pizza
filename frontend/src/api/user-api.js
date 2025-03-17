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
      console.error(error);
      throw error;
    }
  },
  whoAmI: async () => {
    try {
      const response = await base.get('/whoAmI');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  postAddress: async (address) => {
    try {
      const response = await base.post('/addresses', address);
      // eslint-disable-next-line no-console
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAddress: async () => {
    try {
      const response = await base.get('/addresses');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteAddress: async (id) => {
    try {
      const response = await base.delete(`/addresses/${id}`);
      // eslint-disable-next-line no-console
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export { loginApi };
