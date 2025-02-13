<template>
  <form
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
          <CartMainItem
            v-for="pizza in pizzas"
            :key="pizza.id"
            :pizza="pizza"
            :ingredients="adaptIngredients"
            :dough="adaptDough"
            :sauces="adaptSauces"
            :sizes="adaptSizes"
            :pizza-price="calculatePizzaPrice(pizza, pizzaParts)"
            @update-count="validateMainItem(pizza.id, $event)"
          />
          <div class="cart__additional">
            <ul class="additional-list">
              <CartAdditionalItems
                v-for="misc in miscItems"
                :key="misc.id"
                :misc-item="misc"
                @update-count="validateAdditionalItem(misc.id, $event)"
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
      :additional-price="totalAdditionalItemPrice"
      :pizzas-price="totalPizzaPrice"
      @send-data="createFormData"
    />
  </form>
</template>

<script setup>

import CartFooter from '@/modules/Cart/CartFooter.vue';
import CartForm from '@/modules/Cart/CartForm.vue';
import CartAdditionalItems from '@/modules/Cart/CartAdditionalItems.vue';
import CartMainItem from '@/modules/Cart/CartMainItem.vue';
import cartValue from '@/mocks/cartValue.json';
import ingredients from '@/mocks/ingredients.json';
import dough from '@/mocks/dough.json';
import sauces from '@/mocks/sauces.json';
import sizes from '@/mocks/sizes.json';
import miscJSON from '@/mocks/misc.json';
import { normalizeMisc } from '@/common/helpers/normalize';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { calculatePizzaPrice } from '@/common/helpers';
import { orderType } from '@/common/constants';

const adaptToClient = (array) => Object.values(array).reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

const adaptIngredients = adaptToClient(ingredients);
const adaptDough = adaptToClient(dough);
const adaptSauces = adaptToClient(sauces);
const adaptSizes = adaptToClient(sizes);
const miscItems = ref(adaptToClient(miscJSON.map(normalizeMisc)));
const pizzas = ref(cartValue.pizzas);

const validateAdditionalItem = (name, value) => {
  const newValue = Number(value);

  if (newValue < 0) {
    const result = { ...miscItems.value[name] };
    result.quantity = 0;
    miscItems.value[name] = result;
  } else {
    const result = { ...miscItems.value[name] };
    result.quantity = newValue;
    miscItems.value[name] = result;
  }
};
const validateMainItem = async (id, value) => {
  const newValue = Number(value);
  const pizzaIndex = pizzas.value.findIndex((pizza) => pizza.id === id);
  if (newValue === 0) {
    pizzas.value.splice(pizzaIndex, 1);
  } else {
    pizzas.value[pizzaIndex].quantity = newValue;
  }
};

const pizzaParts = {
  ingredients: adaptIngredients,
  sizes: adaptSizes,
  doughs: adaptDough,
  sauces: adaptSauces,
};
const totalPizzaPrice = computed(() => pizzas.value.reduce(
  (acc, pizza) => acc + calculatePizzaPrice(pizza, pizzaParts) * pizza.quantity,
  0,
));

const totalAdditionalItemPrice = computed(() =>
  Object.values(miscItems.value).reduce(
    (acc, misc) => acc + misc.quantity * misc.price,
    0));
watch(
  () => pizzas.value.length,
  (length) => {
    if (length === 0) {
      Object.values(miscItems.value).map((misc) => {
        misc.quantity = 0;
      });
    }
  });
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
const getOrderData = () => {
  const orderData = {
    userId: 'testId',
    phone: formData.value.phone,
    pizzas: pizzas.value,
    misc: Object.values(miscItems.value)
      .filter((misc) => misc.quantity > 0)
      .map((misc) => ({ miscId: misc.id, quantity: misc.quantity })),
  };
  if (formData.value.orderType === orderType.NEW_ADDRESS) {
    orderData.address = formData.value.address;
  }
  // eslint-disable-next-line no-console
  console.log(orderData);
};

const form = useTemplateRef('form');
const createFormData = () => {
  if (form.value.validate()) {
    getOrderData();
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

</style>
