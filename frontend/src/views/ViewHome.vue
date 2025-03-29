<template>
  <span v-if="isError" class="text-field-error">
    При загрузке данных произошла ошибка
  </span>
  <ConstructorMain />
</template>

<script setup>
import ConstructorMain from '@/modules/Constructor/ConstructorMain.vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
const { isError } = storeToRefs(useCartStore());
</script>

<style scoped lang="scss">
.text-field-error {
  color: red;
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
  margin: auto auto;
  width: 480px;
}
</style>
