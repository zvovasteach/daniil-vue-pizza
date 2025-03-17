import { base } from '@/axios-api';

const orderApi = {
  postOrderInfo: async (data) => {
    try {
      const response = await base.post('/orders', data);
      // eslint-disable-next-line no-console
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getOrderInfo: async () => {
    try {
      const response = await base.get('/orders');
      // eslint-disable-next-line no-console
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteOrderInfo: async (id) => {
    try {
      const response = await base.delete(`/orders/${id}`);
      // eslint-disable-next-line no-console
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
export { orderApi };
