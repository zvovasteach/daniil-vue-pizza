import { defineStore } from 'pinia';
import { ref } from 'vue';
import { orderApi } from '@/api/order-api.js';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([]);
  const isOrderRepeat = ref(false);
  const getOrders = async () => {
    orders.value = await orderApi.getOrderInfo();
  };
  return { orders, getOrders, isOrderRepeat };
});
