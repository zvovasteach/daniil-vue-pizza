import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginApi } from '@/api/user-api.js';
import { getToken } from '@/api/token-manager.js';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref(getToken());
  const isAuthenticated = computed (() => !!token.value);
  const isLoading = ref(true);
  const address = ref(null);
  const editingAddressId = ref(null);
  const getUserInfo = async () => {
    try {
      user.value = await loginApi.whoAmI();
      isLoading.value = false;
    } catch (error) {
      console.error(error);
    }
  };
  const getUserToken = async (email, password) => {
    token.value = await loginApi.login(email, password);
    await getUserInfo();
    // eslint-disable-next-line no-console
    console.log(token.value);
  };
  const getAddressInfo = async () => {
    try {
      address.value = await loginApi.getAddress();
    } catch (error) {
      console.error(error);
    }
  };
  const $resetUserStore = () => {
    user.value = '';
    token.value = '';
  };
  return { user, isAuthenticated, getUserToken, getUserInfo,
    $resetUserStore, getAddressInfo, editingAddressId, address, isLoading };
});
