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
// const pizzaIndex = (object, item) => object.findIndex((item) =>
//   item.id === editingPizzaId.value,
// );
const getItemKey = (pizzaPart, itemId) => {
  // eslint-disable-next-line no-console
  console.log(99999, pizzaPart, itemId);
  // console.log(787878, Object.entries(pizzaPart).find(([_, item]) =>
  //   item.id === itemId)[0]);
  return Object.entries(pizzaPart).find(([_, item]) => {
    // eslint-disable-next-line no-console
    console.log(_, item, itemId);
    return item.id === itemId;
  })[0];
};

export const calculatePizzaPrice = (pizza, pizzaParts) => {
  const fillingPrice
      = pizza.ingredients.reduce((acc, value) => {
        const ingredientIndex = getItemKey(pizzaParts.ingredients,
          value.ingredientId);
        acc += value.quantity
        * pizzaParts.ingredients[ingredientIndex].price;
        return acc;
      }, 0);
  // console.log(6666, pizza.sizeId);
  // console.log(7777, pizzaParts.sizes);
  // console.log(1234, pizzaParts)
  const sizeIndex = getItemKey(pizzaParts.sizes,
    pizza.sizeId);
  const doughIndex = getItemKey(pizzaParts.dough,
    pizza.doughId);
  const sauceIndex = getItemKey(pizzaParts.sauces,
    pizza.sauceId);
  // console.log(77, sizeIndex)
  // console.log(8888, pizzaParts.sizes[sizeIndex]);
  const sizeMultiplier = pizzaParts.sizes[sizeIndex].multiplier;
  const doughPrice = pizzaParts.dough[doughIndex].price;
  const saucePrice = pizzaParts.sauces[sauceIndex].price;
  return (sizeMultiplier
    * (fillingPrice + doughPrice + saucePrice));
};
