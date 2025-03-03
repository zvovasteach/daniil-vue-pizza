import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import ingredients from '@/mocks/ingredients.json';
import dough from '@/mocks/dough.json';
import sauces from '@/mocks/sauces.json';
import sizes from '@/mocks/sizes.json';
import miscJSON from '@/mocks/misc.json';

import doughData from '@/common/data/dough-type';
import ingredientsData from '@/common/data/ingredients.js';
import saucesData from '@/common/data/sauces.js';
import sizesData from '@/common/data/sizes.js';
import { adaptToClient, calculatePizzaPrice } from '@/common/helpers';
import { normalizeMisc } from '@/common/helpers/normalize';
import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore('cart', () => {
  const pizzas = useLocalStorage('pizzas', []);
  const pizzaParts = ref({
    ingredients: adaptToClient(ingredients, ingredientsData),
    dough: adaptToClient(dough, doughData),
    sauces: adaptToClient(sauces, saucesData),
    sizes: adaptToClient(sizes, sizesData),
  });
  const misc = ref(adaptToClient(miscJSON.map(normalizeMisc)));
  const editingPizzaId = ref('');
  const totalOrderPrice = computed(() => {
    const totalPizzaPrice = pizzas.value.reduce(
      (acc, pizza) =>
        acc + calculatePizzaPrice(pizza, pizzaParts.value) * pizza.quantity,
      0,
    );
    const totalAdditionalItemPrice = Object.values(misc.value).reduce(
      (acc, miscItem) =>
        acc + miscItem.quantity * miscItem.price, 0);
    return totalAdditionalItemPrice + totalPizzaPrice;
  });
  watch(
    () => pizzas.value.length,
    (length) => {
      if (length === 0) {
        Object.values(misc.value).forEach((miscItem) => {
          miscItem.quantity = 0;
        });
      }
    });
  return { pizzas, misc, pizzaParts, totalOrderPrice, editingPizzaId };
});
