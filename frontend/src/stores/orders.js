import { defineStore } from 'pinia';
import { ref } from 'vue';
import { orderApi } from '@/api/order-api.js';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([]);
  const postOrder = async () => {
    try {
      await orderApi.postOrderInfo();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const getOrders = async () => {
    try {
      orders.value = await orderApi.getOrderInfo();
      // eslint-disable-next-line no-console
      console.log(orders.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return { orders, getOrders, postOrder };
});
