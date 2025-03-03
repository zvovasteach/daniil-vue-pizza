export const getImage = (image) => new URL(`/src/assets/img/${image}`, import.meta.url).href;
// https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
export const adaptToClient = (array, data) =>
  array.reduce((acc, item) => {
    acc[item.id] = item;
    if (data) {
      acc[item.id].value = data[item.id];
    }
    return acc;
  }, {});

export const calculatePizzaPrice = (pizza, pizzaParts) => {
  const fillingPrice
      = pizza.ingredients.reduce((acc, value) => {
        acc += value.quantity
        * pizzaParts.ingredients[value.ingredientId].price;
        return acc;
      }, 0);
  const sizeMultiplier = pizzaParts.sizes[pizza.sizeId].multiplier;
  const doughPrice = pizzaParts.dough[pizza.doughId].price;
  const saucePrice = pizzaParts.sauces[pizza.sauceId].price;
  return (sizeMultiplier
    * (fillingPrice + doughPrice + saucePrice));
};
