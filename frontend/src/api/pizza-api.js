import { base } from '@/axios-api.js';

const pizzaApi = {
  getDough: async () => {
    try {
      const response = await base.get('/dough');
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getSauces: async () => {
    try {
      const response = await base.get('/sauces');
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getIngredients: async () => {
    try {
      const response = await base.get('/ingredients');
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getSizes: async () => {
    try {
      const response = await base.get('/sizes');
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getMisc: async () => {
    try {
      const response = await base.get('/misc');
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
export { pizzaApi };
