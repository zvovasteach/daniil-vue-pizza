<template>
  <AppLayout>
    <router-view
      v-if="!isDoughLoading && !isSizesLoading &&
        !isIngredientsLoading && !isSaucesLoading &&
        !isMiscLoading && !isLoading"
    />
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { useUserStore } from '@/stores/user.js';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart.js';
const { getUserInfo } = useUserStore();
const { isAuthenticated, isLoading } = storeToRefs(useUserStore());
const { isIngredientsLoading, isSizesLoading,
  isDoughLoading, isSaucesLoading,
  isMiscLoading } = storeToRefs(useCartStore());
const { getIngredientsItems, getSaucesItems,
  getSizesItems, getDoughItems, getMiscItems } = useCartStore();
onBeforeMount(() => {
  getIngredientsItems();
  getSaucesItems();
  getSizesItems();
  getDoughItems();
  getMiscItems();
  if (isAuthenticated.value) {
    getUserInfo();
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
