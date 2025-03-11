import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import doughData from '@/common/data/dough-type';
import ingredientsData from '@/common/data/ingredients.js';
import saucesData from '@/common/data/sauces.js';
import sizesData from '@/common/data/sizes.js';
import { adaptToClient, calculatePizzaPrice } from '@/common/helpers';
import { normalizeMisc } from '@/common/helpers/normalize';
import { useLocalStorage } from '@vueuse/core';
import { pizzaApi } from '@/api/pizza-api.js';

export const useCartStore = defineStore('cart', () => {
  const pizzas = useLocalStorage('pizzas', []);
  const pizzaParts = ref({
    ingredients: null,
    dough: null,
    sauces: null,
    sizes: null,
  });
  const isIngredientsLoading = ref(true);
  const isDoughLoading = ref(true);
  const isSaucesLoading = ref(true);
  const isSizesLoading = ref(true);
  const isMiscLoading = ref(true);
  const isError = ref(false);
  const getIngredientsItems = async () => {
    try {
      const response = await pizzaApi.getIngredients();
      pizzaParts.value.ingredients = adaptToClient(response, ingredientsData);
      isIngredientsLoading.value = false;
      // console.log(pizzaParts.value.ingredients);
    } catch (error) {
      isError.value = true;
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const getDoughItems = async () => {
    try {
      const response = await pizzaApi.getDough();
      pizzaParts.value.dough = adaptToClient(response, doughData);
      isDoughLoading.value = false;
      // console.log(pizzaParts.value.dough);
    } catch (error) {
      isError.value = true;
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const getSaucesItems = async () => {
    try {
      const response = await pizzaApi.getSauces();
      pizzaParts.value.sauces = adaptToClient(response, saucesData);
      isSaucesLoading.value = false;
      // console.log(pizzaParts.value.sauces);
    } catch (error) {
      isError.value = true;
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const getSizesItems = async () => {
    try {
      const response = await pizzaApi.getSizes();
      pizzaParts.value.sizes = adaptToClient(response, sizesData);
      isSizesLoading.value = false;
      // console.log(pizzaParts.value.sizes);
    } catch (error) {
      isError.value = true;
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  // const miscTest = ref(adaptToClient(miscJSON.map(normalizeMisc)));
  // console.log(111,miscTest.value)
  const misc = ref([]);
  const getMiscItems = async () => {
    try {
      const response = await pizzaApi.getMisc();
      misc.value = adaptToClient(response.map(normalizeMisc));
      // console.log(222,misc.value)
      isMiscLoading.value = false;
    } catch (error) {
      isError.value = true;
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const editingPizzaId = ref('');
  const totalOrderPrice = computed(() => {
    if (isIngredientsLoading.value && isSaucesLoading.value
      && isSizesLoading.value && isDoughLoading.value
      && isMiscLoading) {
      return 0;
    }
    const totalPizzaPrice = pizzas.value.reduce(
      (acc, pizza) =>
        acc + calculatePizzaPrice(pizza, pizzaParts.value) * pizza.quantity,
      0,
    );
    const totalAdditionalItemPrice = Object.values(misc.value).reduce(
      (acc, miscItem) =>
        acc + miscItem.quantity * miscItem.price,
      0,
    );
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
  return {
    pizzas, misc, pizzaParts, totalOrderPrice, editingPizzaId,
    getIngredientsItems, getDoughItems, getSizesItems, getSaucesItems,
    getMiscItems, isSizesLoading, isSaucesLoading, isDoughLoading,
    isIngredientsLoading, isMiscLoading, isError,
  };
});
