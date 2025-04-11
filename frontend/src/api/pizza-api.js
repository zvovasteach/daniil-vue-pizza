import { base } from '@/axios-api.js';

const pizzaApi = {
  getDough: async () => {
    try {
      const response = await base.get('/dough');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getSauces: async () => {
    try {
      const response = await base.get('/sauces');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getIngredients: async () => {
    try {
      const response = await base.get('/ingredients');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getSizes: async () => {
    try {
      const response = await base.get('/sizes');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getMisc: async () => {
    try {
      const response = await base.get('/misc');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
export { pizzaApi };
