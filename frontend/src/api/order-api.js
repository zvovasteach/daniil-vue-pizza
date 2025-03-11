import { base } from '@/axios-api';

const orderApi = {
  postOrderInfo: async (order) => {
    try {
      const response = await base.post('/orders', { order });
      // eslint-disable-next-line no-console
      console.log(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  getOrderInfo: async () => {
    try {
      const response = await base.get('/orders');
      // eslint-disable-next-line no-console
      console.log(response);
      return response.data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      throw err;
    }
  },
};
export { orderApi };
