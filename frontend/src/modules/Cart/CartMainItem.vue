<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        />
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>
              {{ pizzaParts.sizes[pizza.sizeId].name }}, на
              {{ doughNameRu[pizza.doughId] }} тесте
            </li>
            <li>Соус: {{ pizzaParts.sauces[pizza.sauceId].name }}</li>
            <li>
              Начинка:
              <template
                v-for="ingredient in pizza.ingredients"
                :key="ingredient.id"
              >
                {{ pizzaParts.ingredients[ingredient.ingredientId].name }},
              </template>
            </li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <AppCounter
          :model-value="pizza.quantity"
          orange
          @update:model-value="updatePizzaCount(pizza.id, $event)"
        />
      </div>

      <div class="cart-list__price">
        <b>{{ pizzaPrice * pizza.quantity }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="editPizza(pizza)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import AppCounter from '@/common/components/AppCounter.vue';
import doughNameRu from '@/common/data/dough-name-ru';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { calculatePizzaPrice } from '@/common/helpers';
import router from '@/router';
import { RouteName } from '@/common/constants';
import { computed } from 'vue';

const { pizzaParts, editingPizzaId, pizzas, isIngredientsLoading,
  isMiscLoading, isSaucesLoading, isSizesLoading,
  isDoughLoading } = storeToRefs(useCartStore());

const props = defineProps({
  pizza: {
    type: Object,
    required: true,
  },
});
const pizzaPrice = computed (() => {
  if (isIngredientsLoading.value || isSaucesLoading.value
    || isSizesLoading.value || isDoughLoading.value
    || isMiscLoading.value) {
    return 0;
  }
  return calculatePizzaPrice(props.pizza, pizzaParts.value);
});

const editPizza = (pizza) => {
  editingPizzaId.value = pizza.id;
  router.push({ name: RouteName.HOME });
};
const updatePizzaCount = (id, value) => {
  const newValue = Number(value);
  const pizzaIndex = pizzas.value.findIndex((pizza) => pizza.id === id);
  if (newValue === 0) {
    pizzas.value.splice(pizzaIndex, 1);
  } else {
    pizzas.value[pizzaIndex].quantity = newValue;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/mixins/m_center";

//cart-list styles

.cart-list {
  @include m_clear-list.clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include ds-typography.b-s16-h19;
  }
}

.cart-list__edit {
  @include ds-typography.l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: ds-colors.$green-500;
  }

  &:active {
    color: ds-colors.$green-600;
  }

  &:focus {
    color: ds-colors.$green-400;
  }
}
//counter styles

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: ds-colors.$purple-100;

    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: ds-colors.$black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$purple-200;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: ds-colors.$green-500;

    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &::after {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$green-400;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: ds-colors.$orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$orange-100;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$orange-300;
    }
  }
}

.counter__input {
  @include ds-typography.r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: ds-colors.$black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset ds-shadows.$shadow-regular;
  }
}

//product styles
.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include ds-typography.b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include m_clear-list.clear-list;
    @include ds-typography.l-s11-h13;
  }
}
</style>
