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
                v-model="fillingItems"
                :ingredients-filling="ingredientsFilling"
              />
            </div>
          </div>
        </div>
        <PizzaPreview
          v-model="fillingItems"
          :sauce="selectedSauce"
          :dough="selectedDough"
          :size="selectedSize"
          :ingredients-filling="ingredientsFilling"
        />
      </div>
    </form>
  </main>
</template>

<script setup>

import { ref } from 'vue';

import DoughType from '@/modules/DoughType/components/DoughType.vue';
import DoughSize from '@/modules/DoughSize/components/DoughSize.vue';
import DoughSauce from '@/modules/DoughSauce/components/DoughSauce.vue';
import DoughFilling from '@/modules/DoughFilling/components/DoughFilling.vue';
import PizzaPreview from '@/modules/PizzaPreview/components/PizzaPreview.vue';

import doughJSON from '@/mocks/dough.json';
import {
  normalizeDough,
} from '@/common/helpers/normalize';
const doughItems = doughJSON.map(normalizeDough);

import saucesJSON from '@/mocks/sauces.json';
import { normalizeSauces } from '@/common/helpers/normalize';
const sauceItems = saucesJSON.map(normalizeSauces);

import { normalizeSize } from '@/common/helpers/normalize';
import sizesJSON from '@/mocks/sizes.json';
const sizeItems = sizesJSON.map(normalizeSize);

const selectedSauce = ref(sauceItems[0]);
const selectedDough = ref(doughItems[0]);
const selectedSize = ref(sizeItems[0]);

import ingredientsJSON from '@/mocks/ingredients.json';
import { normalizeIngredients } from '@/common/helpers/normalize';
const ingredientsFilling = ingredientsJSON.map(normalizeIngredients);

const fillingItems = ref(
  ingredientsFilling.reduce((acc, curr) => {
    acc[curr.value] = {
      count: 0,
      price: curr.price,
    };
    return acc;
  }, {}),
);
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
  align-items: center;
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
//title styles
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: ds-colors.$black;

  &--big {
    @include ds-typography.b-s36-h42;
  }

  &--small {
    @include ds-typography.b-s18-h21;
  }
}
</style>
