import doughSizes from '@/common/enums/dough-type.js';
import ingredients from '@/common/enums/ingredient-type.js';
import sauces from '@/common/enums/sauce-type.js';
import sizes from '@/common/enums/size-type.js';

export const normalizeDough = (dough) => ({ ...dough,
  value: doughSizes[dough.id] });

export const normalizeSize = (size) => ({ ...size,
  value: sizes[size.id] });

export const normalizeIngredients = (ingredient) => ({ ...ingredient,
  value: ingredients[ingredient.id] });

export const normalizeSauces = (sauce) => ({ ...sauce,
  value: sauces[sauce.id] });
