<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <section
        v-for="order in orders"
        :key="order.id"
        class="sheet order"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>
          <div class="order__sum">
            <span>Сумма заказа:
              {{ totalPizzaPrice(order.orderPizzas) +
                totalAdditionalItemPrice(order.orderMisc) }} ₽</span>
          </div>
          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button
              type="button"
              class="button"
              @click="repeatOrder(order)"
            >
              Повторить
            </button>
          </div>
        </div>
        <ul class="order__list">
          <OrderPizza
            v-for="pizza in order.orderPizzas"
            :key="pizza.id"
            :pizza="pizza"
          />
        </ul>
        <ul class="order__additional">
          <OrderAdditional
            v-for="miscItem in order.orderMisc"
            :key="miscItem.miscId"
            :misc="miscItem"
            :misc-items="misc"
          />
        </ul>
        <p
          v-if="order.orderAddress"
          class="order__address"
        >
          Адрес доставки:
          Ул. {{ order.orderAddress.street }},
          Д. {{ order.orderAddress.building }}
          <span v-if="order.orderAddress.flat">
            ,Кв. {{ order.orderAddress.flat }}.
          </span>
          {{ order.orderAddress.comment }}
        </p>
      </section>
    </div>
  </main>
</template>

<script setup>
import OrderPizza from '@/modules/Orders/OrderPizza.vue';
import OrderAdditional from '@/modules/Orders/OrderAdditional.vue';
import { onBeforeMount } from 'vue';
import { calculatePizzaPrice } from '@/common/helpers';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useOrdersStore } from '@/stores/orders.js';
import { orderApi } from '@/api/order-api.js';
import router from '@/router/index.js';
import { RouteName } from '@/common/constants.js';
const { getOrders } = useOrdersStore();
const { orders, isOrderRepeat } = storeToRefs(useOrdersStore());
const { pizzaParts, misc, pizzas } = storeToRefs(useCartStore());

const totalPizzaPrice = (orderPizzas) =>
  Object.values(orderPizzas).reduce((acc, pizza) =>
    acc + calculatePizzaPrice(pizza, pizzaParts.value) * pizza.quantity,
  0,
  );
const totalAdditionalItemPrice = (miscs) => {
  if (miscs) {
    return Object.values(miscs).reduce(
      (acc, miscItem) =>
        acc + miscItem.quantity * misc.value[miscItem.miscId].price,
      0,
    );
  } else {
    return 0;
  }
};
const deleteOrder = async (id) => {
  await orderApi.deleteOrderInfo(id);
  await getOrders();
};
const repeatOrder = (order) => {
  isOrderRepeat.value = true;
  pizzas.value = order.orderPizzas;
  pizzas.value.map((pizza) => {
    if (pizza.ingredients) {
      pizza.ingredients.map((ingredient) => {
        delete ingredient.id;
        delete ingredient.pizzaId;
      });
    }
    delete pizza.orderId;
  });
  if (order.orderMisc) {
    Object.values(order.orderMisc).map((miscItem) => {
      misc.value[miscItem.miscId].quantity = miscItem.quantity;
    });
  }
  router.push({ name: RouteName.CART });
};
onBeforeMount(() => {
  getOrders();
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/mixins/m_clear-list";

//layout styles
.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 180px;
  height: 100%;

  background-color: rgba(ds-colors.$green-500, 0.05);
}

.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: ds-colors.$green-500;

  img {
    display: block;

    margin: 0 auto;
  }
}

.layout__link {
  @include ds-typography.b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: ds-colors.$black;

  &--active {
    background-color: rgba(ds-colors.$green-500, 0.1);
  }

  &:hover {
    background-color: rgba(ds-colors.$green-500, 0.2);
  }

  &:active {
    color: rgba(ds-colors.$black, 0.5);
  }
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin-bottom: 27px;
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}

.layout__address {
  margin-top: 16px;
}
//order styles

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  b {
    @include ds-typography.b-s14-h16;
  }

  span {
    @include ds-typography.b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include ds-typography.b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include ds-typography.b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include ds-typography.l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

//button styles

.button {
  $bl: &;

  @include ds-typography.b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: ds-colors.$white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: ds-shadows.$shadow-medium;

  background-color: ds-colors.$green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: ds-colors.$green-400;
  }

  &:active:not(:disabled) {
    background-color: ds-colors.$green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: ds-colors.$green-300;
    color: rgba(ds-colors.$white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid ds-colors.$green-500;
    color: ds-colors.$black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$green-500;
      border-color: ds-colors.$green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: ds-colors.$green-600;
      border-color: ds-colors.$green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include ds-typography.b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: ds-colors.$black;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: ds-colors.$red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: ds-colors.$white;
    color: ds-colors.$green-500;
  }
}

</style>
