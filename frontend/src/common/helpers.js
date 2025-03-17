export const getImage = (image) => new URL(`/src/assets/img/${image}`, import.meta.url).href;
// https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
export const getPublicImage = (path) => {
  const publicUrl = '/api';
  return `${publicUrl}/${path}`;
};
export const adaptToClient = (array, data) =>
  array.reduce((acc, item) => {
    acc[item.id] = item;
    if (data) {
      acc[item.id].value = data[item.id];
    }
    return acc;
  }, {});
const getItemKey = (pizzaPart, itemId) => Object.entries(pizzaPart)
  // eslint-disable-next-line no-unused-vars
  .find(([_, item]) => item.id === itemId)[0];

export const calculatePizzaPrice = (pizza, pizzaParts) => {
  let fillingPrice = 0;
  if (pizza.ingredients) {
    fillingPrice = pizza.ingredients.reduce((acc, value) => {
      const ingredientIndex = getItemKey(pizzaParts.ingredients,
        value.ingredientId);
      acc += value.quantity
      * pizzaParts.ingredients[ingredientIndex].price;
      return acc;
    }, 0);
  }
  const sizeIndex = getItemKey(pizzaParts.sizes,
    pizza.sizeId);
  const doughIndex = getItemKey(pizzaParts.dough,
    pizza.doughId);
  const sauceIndex = getItemKey(pizzaParts.sauces,
    pizza.sauceId);
  const sizeMultiplier = pizzaParts.sizes[sizeIndex].multiplier;
  const doughPrice = pizzaParts.dough[doughIndex].price;
  const saucePrice = pizzaParts.sauces[sauceIndex].price;
  return (sizeMultiplier
    * (fillingPrice + doughPrice + saucePrice));
};
