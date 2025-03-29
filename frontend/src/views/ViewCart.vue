<template>
  <form
    v-if="!isShowPopup"
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="!pizzas.length"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>
        <template
          v-else
        >
          <template
            v-if="!isDoughLoading || !isSizesLoading ||
              !isIngredientsLoading || !isSaucesLoading ||
              !isMiscLoading"
          >
            <CartMainItem
              v-for="pizza in pizzas"
              :key="pizza.id"
              :pizza="pizza"
            />
          </template>
          <div class="cart__additional">
            <ul class="additional-list">
              <CartAdditionalItem
                v-for="miscItem in misc"
                :key="miscItem.id"
                :misc-item="miscItem"
              />
            </ul>
          </div>
          <CartForm
            ref="form"
            v-model="formData"
          />
        </template>
      </div>
    </main>
    <CartFooter
      :is-loading="isLoading"
      :error-message="errorMessage"
      @confirm-order="createOrder"
    />
  </form>
  <div
    v-if="isShowPopup"
    class="popup"
  >
    <a href="#" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="{ name:RouteName.ORDERS}" class="button">Отлично, я жду!</router-link>
    </div>
  </div>
</template>

<script setup>

import CartFooter from '@/modules/Cart/CartFooter.vue';
import CartForm from '@/modules/Cart/CartForm.vue';
import CartAdditionalItem from '@/modules/Cart/CartAdditionalItem.vue';
import CartMainItem from '@/modules/Cart/CartMainItem.vue';
import { ref, useTemplateRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { orderType, RouteName } from '@/common/constants';
const { pizzas, misc } = storeToRefs(useCartStore());
const { isAuthenticated, user, address } = storeToRefs(useUserStore());
import { orderApi } from '@/api/order-api.js';
import router from '@/router/index.js';
const { isIngredientsLoading, isSizesLoading,
  isDoughLoading, isSaucesLoading,
  isMiscLoading } = storeToRefs(useCartStore());
const isShowPopup = ref(false);
const formData = ref({
  orderType: orderType.NEW_ADDRESS,
  phone: '',
  address: {
    street: '',
    building: '',
    flat: '',
  },
},
);
watch(
  () => formData.value.orderType,
  (order) => {
    if (order !== orderType.NEW_ADDRESS && order !== orderType.BY_YOURSELF) {
      const addressKey = Object.entries(address.value)
        // eslint-disable-next-line no-unused-vars
        .find(([_, item]) => item.id === order)[0];
      formData.value.address = {
        street: address.value[addressKey].street,
        building: address.value[addressKey].building,
        flat: address.value[addressKey].flat,
      };
    }
    if (order === orderType.NEW_ADDRESS) {
      formData.value.address = {
        street: '',
        building: '',
        flat: '',
      };
    }
  });
const getOrderData = () => {
  const orderData = {
    userId: user.value.id ? user.value.id : '',
    phone: formData.value.phone,
    pizzas: pizzas.value,
    misc: Object.values(misc.value)
      .filter((miscItem) => miscItem.quantity > 0)
      .map((miscItem) =>
        ({ miscId: miscItem.id, quantity: miscItem.quantity })),
  };
  if (formData.value.orderType === orderType.NEW_ADDRESS) {
    orderData.address = formData.value.address;
  }
  return orderData;
};
const errorMessage = ref('');
const isLoading = ref(false);
const form = useTemplateRef('form');
const createOrder = async () => {
  if (form.value.validate()) {
    if (!isAuthenticated.value) {
      await router.push({ name: RouteName.SIGN_IN });
      return;
    }
    isLoading.value = true;
    try {
      errorMessage.value = '';
      Object.values(pizzas.value).map((pizza) => delete pizza.id);
      const order = getOrderData();
      await orderApi.postOrderInfo(order);
    } catch (error) {
      errorMessage.value = 'При оформлении заказа произошла ошибка';
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      isLoading.value = false;
    }
    if (!errorMessage.value) {
      isShowPopup.value = true;
      pizzas.value = [];
      isLoading.value = false;
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";
@use "@/assets/scss/mixins/m_clear-list";

//additional-list styles

.additional-list {
  @include m_clear-list.clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include ds-typography.b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include ds-typography.b-s16-h19;
}

//cart styles
.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

//header styles
.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: ds-colors.$green-500;
  box-shadow: ds-shadows.$shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include ds-typography.b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: ds-colors.$white;
    background-color: ds-colors.$green-500;
    background-image: url("@/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: ds-colors.$green-500;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include ds-typography.r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: ds-colors.$white;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: '';
    vertical-align: middle;

    background: url(@/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
}

.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: '';
    vertical-align: middle;

    background: url(@/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
}

//user styles
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include ds-typography.b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include ds-typography.b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

//layout-form styles
.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.popup {
  @include m_center.pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: ds-colors.$white;
  box-shadow: ds-shadows.$shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}

</style>
