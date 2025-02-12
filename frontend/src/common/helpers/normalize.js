import doughSizes from '@/common/data/dough-type';
import ingredients from '@/common/data/ingredients.js';
import sauces from '@/common/data/sauces.js';
import sizes from '@/common/data/sizes.js';

export const normalizeDough = (dough) => ({
  ...dough,
  value: doughSizes[dough.id],
});

export const normalizeSize = (size) => ({
  ...size,
  value: sizes[size.id],
});

export const normalizeIngredients = (ingredient) => ({
  ...ingredient,
  value: ingredients[ingredient.id],
});

export const normalizeSauces = (sauce) => ({
  ...sauce,
  value: sauces[sauce.id],
});

export const normalizePizzas = (pizza) => ({
  ...pizza,
});

export const normalizeMisc = (misc) => ({
  ...misc,
  quantity: 0,
});
