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
      <button
        type="submit"
        class="button"
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
const { totalOrderPrice } = storeToRefs(useCartStore());
defineEmits(['confirmOrder']);
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

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
  button {
    padding: 16px 14px;
  }
}

</style>
