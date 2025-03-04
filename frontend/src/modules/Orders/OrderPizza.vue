<template>
  <li class="order__item">
    <div class="product">
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

    <p class="order__price">
      <span v-if="pizza.quantity > 1"> {{ pizza.quantity }}x
      </span>
      {{ pizzaPrice }} ₽
    </p>
  </li>
</template>

<script setup>
import doughNameRu from '@/common/data/dough-name-ru';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { calculatePizzaPrice } from '@/common/helpers';
const { pizzaParts } = storeToRefs(useCartStore());
const props = defineProps({
  pizza: {
    type: Object,
    required: true,
  },
});
const pizzaPrice = calculatePizzaPrice(props.pizza, pizzaParts.value);
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";

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
