<template>
  <section class="footer">
    <div class="footer__more">
      <router-link :to="{ name: RouteName.HOME}" class="button button--border button--arrow">Хочу еще одну</router-link>
    </div>
    <p class="footer__text">Перейти к конструктору<br />чтоб собрать ещё одну пиццу</p>
    <div class="footer__price">
      <b>Итого: {{ totalOrderPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <span v-if="errorMessage" class="text-field__error">{{ errorMessage }}</span>
      <button
        v-if="isOrderRepeat"
        class="button button--decline"
        :disabled="isPressed"
        @click="canselOrder"
      >
        Отмена
      </button>
      <button
        type="submit"
        class="button"
        :disabled="isLoading || pizzas.length === 0"
        @click="$emit('confirmOrder')"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script setup>
import { RouteName } from '@/common/constants';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
const { totalOrderPrice, pizzas } = storeToRefs(useCartStore());
import { useOrdersStore } from '@/stores/orders.js';
import router from '@/router/index.js';
import { onBeforeUnmount, ref } from 'vue';
const { isOrderRepeat } = storeToRefs(useOrdersStore());
defineEmits(['confirmOrder']);
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },
});
const isPressed = ref(false);
const canselOrder = () => {
  isPressed.value = true;
  pizzas.value = [];
  router.push({ name: RouteName.ORDERS });
};
onBeforeUnmount(() => {
  if (isPressed.value) {
    isPressed.value = false;
  }
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.text-field__error {
  position: absolute;
  bottom: 100px;
  right: 20px;
  color: red;
  font-size: 16px;
  line-height: 14px;
  font-weight: 400;
  margin-top: 20px;
  width: 250px;
  text-align: center;
}
//footer styles

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba(ds-colors.$green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include ds-typography.l-s11-h13;

  color: rgba(ds-colors.$black, 0.5);
}

.footer__price {
  @include ds-typography.b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  display: flex;
  height: 50px;
  gap: 10px;
  button {
    padding: 16px 14px;
  }
}
//button-decline
.button--decline {
  width: 100px;
  background-color: grey;
}
</style>
