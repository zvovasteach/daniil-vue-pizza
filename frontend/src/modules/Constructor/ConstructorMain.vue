<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <ConstructorType
          v-model="selectedDough"
          :dough-items="pizzaParts.dough"
        />
        <ConstructorSize
          v-model="selectedSize"
          :size-items="pizzaParts.sizes"
        />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
            <div class="sheet__content ingredients">
              <ConstructorSauce
                v-model="selectedSauce"
                :sauce-items="pizzaParts.sauces"
              />
              <ConstructorFilling
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
          <ConstructorPizza
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
                class="button--send"
                :disabled="!pizzaName"
                @click="savePizzaInformation"
              >
                {{ editingPizzaId ? "Сохранить" : "Готовьте!" }}
              </AppButton>
              <AppButton
                v-if="editingPizzaId"
                class="button--decline"
                :disabled="!pizzaName"
                @click="declineSavePizzaInformation"
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
import ConstructorType from '@/modules/Constructor/ConstructorType.vue';
import ConstructorSize from '@/modules/Constructor/ConstructorSize.vue';
import ConstructorSauce from '@/modules/Constructor/ConstructorSauce.vue';
import ConstructorFilling from '@/modules/Constructor/ConstructorFilling.vue';
import ConstructorPizza from '@/modules/Constructor/ConstructorPizza.vue';
import AppButton from '@/common/components/AppButton.vue';
import AppInput from '@/common/components/AppInput.vue';
import { uniqueId } from 'lodash-es/util';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { RouteName } from '@/common/constants';
import router from '@/router';
import { calculatePizzaPrice } from '@/common/helpers';
const { editingPizzaId, pizzas, pizzaParts } = storeToRefs(useCartStore());
// console.log(1111, pizzaParts.value.sauces[1])
const selectedSauce = ref(pizzaParts.value.sauces[1]);
// console.log(pizzaParts.value)
const selectedDough = ref(pizzaParts.value.dough[1]);
// const lowMultiplierSize = Object.values(pizzaParts.value.sizes).filter((size) => size.multiplier === 1);
// console.log(2222,lowMultiplierSize);
// console.log(1111,pizzaParts.value.sizes[1])
const selectedSize = ref(pizzaParts.value.sizes[1]);
const pizzaName = ref('');
const ingredientsFilling = ref(pizzaParts.value.ingredients);
// eslint-disable-next-line no-console
console.log(pizzaParts.value.sizes);
// console.log(ingredientsFilling.value);
const fillingItems = ref(
  Object.values(ingredientsFilling.value).reduce((acc, curr) => {
    acc[curr.value] = {
      quantity: 0,
      price: curr.price,
      ingredientId: curr.id,
    };
    return acc;
  }, {}),
);

const selectedItems = computed(() =>
  Object.entries(fillingItems.value).reduce((acc, [key, value]) => {
    if (value.quantity) {
      acc[key] = value;
    }
    return acc;
  }, {}));

const pizzaPrice = computed(() => calculatePizzaPrice(
  {
    ingredients: Object.values(selectedItems.value),
    sizeId: selectedSize.value.id,
    doughId: selectedDough.value.id,
    sauceId: selectedSauce.value.id,
  },
  pizzaParts.value,
));
const createPizzaInformation = () =>
  ({
    name: pizzaName.value,
    sauceId: selectedSauce.value.id,
    doughId: selectedDough.value.id,
    sizeId: selectedSize.value.id,
    quantity: 1,
    ingredients: Object.values(selectedItems.value).map((item) => ({
      ingredientId: item.ingredientId,
      quantity: item.quantity,
    })),
    id: uniqueId(),
  });
const savePizzaInformation = () => {
  if (editingPizzaId.value) {
    const pizzaIndex = pizzas.value.findIndex((pizzaItem) =>
      pizzaItem.id === editingPizzaId.value,
    );
    pizzas.value.splice(pizzaIndex, 1, createPizzaInformation());
  } else {
    pizzas.value.push(createPizzaInformation());
  }
  router.push({ name: RouteName.CART });
};
const declineSavePizzaInformation = () => {
  router.push({ name: RouteName.CART });
};
onBeforeMount(() => {
  if (editingPizzaId.value) {
    const pizzaItem = pizzas.value.find((pizza) =>
      pizza.id === editingPizzaId.value,
    );
    selectedSauce.value = Object.values(pizzaParts.value.sauces).find((sauce) =>
      pizzaItem.sauceId === sauce.id,
    );
    selectedDough.value = Object.values(pizzaParts.value.dough).find((dough) =>
      pizzaItem.doughId === dough.id,
    );
    selectedSize.value = Object.values(pizzaParts.value.sizes).find((size) =>
      pizzaItem.sizeId === size.id,
    );
    pizzaName.value = pizzaItem.name;
    pizzaItem.ingredients.map((ingredientItem) => {
      Object.values(fillingItems.value).find((ingredient) =>
        ingredient.ingredientId === ingredientItem.ingredientId).quantity
        = ingredientItem.quantity;
    });
  }
});
onBeforeUnmount(() => {
  editingPizzaId.value = '';
});
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
