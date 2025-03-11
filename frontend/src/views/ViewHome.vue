<template>
  <ConstructorMain />
  <span v-if="isError" class="text-field-error">
    При загрузке данных произошла ошибка
  </span>
</template>

<script setup>
import ConstructorMain from '@/modules/Constructor/ConstructorMain.vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
const { isError } = storeToRefs(useCartStore());
</script>

<style scoped lang="scss">
.text-field__error {
  color: red;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  position: absolute;
  width: 230px;
}
</style>
