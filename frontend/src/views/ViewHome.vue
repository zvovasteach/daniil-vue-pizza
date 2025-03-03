<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughType v-model="selectedDough" :dough-items="doughItems" />
        <DoughSize v-model="selectedSize" :size-items="sizeItems" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
            <div class="sheet__content ingredients">
              <DoughSauce v-model="selectedSauce" :sauce-items="sauceItems" />
              <DoughFilling
                v-model:filling-items="fillingItems"
                :ingredients-filling="ingredientsFilling"
              />
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <AppInput
            v-model="pizzaName"
            label="Название пиццы"
            placeholder="Введите название пиццы"
            input-name="pizza-name"
            hidden
          />
          <PizzaPreview
            v-model="fillingItems"
            :sauce="selectedSauce"
            :dough="selectedDough"
            :size="selectedSize"
            :ingredients-filling="ingredientsFilling"
            :selected-items="selectedItems"
          />
          <div class="content__result">
            <p class="pizza-price">Итого: {{ pizzaPrice }} ₽</p>
            <div class="button-wrapper">
              <AppButton
                v-if="editingPizzaId"
                class="button--send"
                :disabled="!pizzaName"
                @click="sendPizzaInformation"
              >
                Сохранить
              </AppButton>
              <AppButton
                v-else
                class="button--send"
                :disabled="!pizzaName"
                @click="sendPizzaInformation"
              >
                Готовьте!
              </AppButton>
              <AppButton
                v-if="editingPizzaId"
                class="button--decline"
                :disabled="!pizzaName"
                @click="declineSendPizzaInformation"
              >
                Отмена
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import DoughType from '@/modules/Constructor/ConstructorDoughType.vue';
import DoughSize from '@/modules/Constructor/ConstructorDoughSize.vue';
import DoughSauce from '@/modules/Constructor/ConstructorDoughSauce.vue';
import DoughFilling from '@/modules/Constructor/ConstructorDoughFilling.vue';
import PizzaPreview from '@/modules/Constructor/ConstructorPizzaPreview.vue';
import doughJSON from '@/mocks/dough.json';
import saucesJSON from '@/mocks/sauces.json';
import sizesJSON from '@/mocks/sizes.json';
import ingredientsJSON from '@/mocks/ingredients.json';
import { normalizeIngredients, normalizeSauces, normalizeSize, normalizeDough } from '@/common/helpers/normalize';
import AppButton from '@/common/components/AppButton.vue';
import AppInput from '@/common/components/AppInput.vue';
import { uniqueId } from 'lodash-es/util';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { RouteName } from '@/common/constants';
import router from '@/router';
const { editingPizzaId, pizzas } = storeToRefs(useCartStore());
const doughItems = doughJSON.map(normalizeDough);

const sauceItems = saucesJSON.map(normalizeSauces);

const sizeItems = sizesJSON.map(normalizeSize);

const selectedSauce = ref(sauceItems[0]);
const selectedDough = ref(doughItems[0]);
const selectedSize = ref(sizeItems[0]);
const pizzaName = ref('');
const ingredientsFilling = ingredientsJSON.map(normalizeIngredients);

const fillingItems = ref(
  ingredientsFilling.reduce((acc, curr) => {
    acc[curr.value] = {
      count: 0,
      price: curr.price,
      id: curr.id,
    };
    return acc;
  }, {}),
);

onBeforeMount(() => {
  if (editingPizzaId.value) {
    selectedSauce.value = sauceItems.find((sauce) =>
      pizzas.value.find((pizzaItem) => pizzaItem.id === editingPizzaId.value)
        .sauceId === sauce.id);
    ///
    selectedDough.value = doughItems.find((dough) =>
      pizzas.value.find((pizzaItem) => pizzaItem.id === editingPizzaId.value)
        .doughId === dough.id);
    ///
    selectedSize.value = sizeItems.find((size) =>
      pizzas.value.find((pizzaItem) =>
        pizzaItem.id === editingPizzaId.value).sizeId === size.id);
    ///
    pizzaName.value = pizzas.value.find((pizzaItem) =>
      pizzaItem.id === editingPizzaId.value).name;
    ///
    pizzas.value.find((pizzaItem) =>
      pizzaItem.id === editingPizzaId.value)
      .ingredients.map((ingredientItem) => {
        Object.values(fillingItems.value).find((ingredient) =>
          ingredient.id === ingredientItem.ingredientId).count
      = ingredientItem.quantity;
      });
  }
});

const selectedItems = computed(() =>
  Object.entries(fillingItems.value).reduce((acc, [key, value]) => {
    if (value.count) {
      acc[key] = value;
    }
    return acc;
  }, {}));
const pizzaPrice = computed(() => {
  const fillingPrice
    = Object.values(selectedItems.value).reduce((acc, value) => {
      acc += value.count * value.price;
      return acc;
    }, 0);
  return selectedSize.value.multiplier
    * (fillingPrice + selectedDough.value.price + selectedSauce.value.price);
});
const createPizzaInformation = () =>
  ({
    name: pizzaName.value,
    sauceId: selectedSauce.value.id,
    doughId: selectedDough.value.id,
    sizeId: selectedSize.value.id,
    quantity: 1,
    ingredients: Object.values(selectedItems.value).map((item) => (
      {
        ingredientId: item.id,
        quantity: item.count,
      })),
    id: uniqueId(),
  });
const sendPizzaInformation = () => {
  if (editingPizzaId.value) {
    const pizzaIndex = pizzas.value.findIndex((pizzaItem) =>
      pizzaItem.id === editingPizzaId.value);
    pizzas.value.splice(pizzaIndex, 1, createPizzaInformation());
  } else {
    pizzas.value.push(createPizzaInformation());
  }
  router.push({ name: RouteName.CART });
};
const declineSendPizzaInformation = () => {
  router.push({ name: RouteName.CART });
};
onBeforeUnmount(() => (editingPizzaId.value = ''));
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/mixins/m_center";

//main styles
.main {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
}

.main__wrapper {
  padding-bottom: 30px;

  background-color: ds-colors.$white;
  box-shadow: ds-shadows.$shadow-light;

  h1 {
    margin-bottom: 0;
    padding: 0 95px;

    text-align: center;

    @include ds-typography.b-s36-h42;
  }

  p {
    padding: 0 95px;

    text-align: center;

    font-size: 20px;
    line-height: 30px;
  }

  b {
    font-size: 1.2em;
  }
}

.main__header {
  margin-bottom: 30px;
  padding: 20px 0;

  background-color: ds-colors.$green-600;

  img {
    display: block;

    margin: 0 auto;
  }
}
//content styles
.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: start;
  justify-content: center;

  margin-top: 25px;

  p {
    @include ds-typography.b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

.pizza-price {
  padding-top: 10px;
}
.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.button--send {
  margin: 0 auto;
}
.button--decline {
  width: 180px;
  margin-top: 20px;
  background-color: grey;
}
</style>
