<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredientsFilling"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag :transfer-data="ingredient.value">
          <span
            :class="`filling filling--${ingredient.value}`"
          >
            {{ ingredient.name }}
          </span>
        </AppDrag>
        <div class="counter counter--orange ingredients__counter">
          <AppCounter
            :max-count="MAX_FILLING_COUNT"
            :model-value="fillingItems[ingredient.value].count"
            @update:model-value="inputValidation(ingredient.value, $event)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { MAX_FILLING_COUNT } from '@/common/constants';
import AppDrag from '@/common/components/AppDrag.vue';
import AppCounter from '@/common/components/AppCounter.vue';

const props = defineProps({
  ingredientsFilling: {
    type: Object,
    required: true,
  },
  fillingItems: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update:fillingItems']);
const inputValidation = async (name, value) => {
  const newValue = Number(value);
  if (newValue > MAX_FILLING_COUNT) {
    const result = { ...props.fillingItems[name] };
    result.count = MAX_FILLING_COUNT;
    emit('update:fillingItems', {
      ...props.fillingItems,
      [name]: result,
    });
  } else if (newValue < 0) {
    const result = { ...props.fillingItems[name] };
    result.count = 0;
    emit('update:fillingItems', {
      ...props.fillingItems,
      [name]: result,
    });
  } else {
    const result = { ...props.fillingItems[name] };
    result.count = newValue;
    emit('update:fillingItems', {
      ...props.fillingItems,
      [name]: result,
    });
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/mixins/m_center";
@use "@/assets/scss/ds-system/ds-shadows";
//filling styles
.filling {
  @include ds-typography.r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include m_center.p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: ds-colors.$white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;

  }

  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
  }
}

//ingredients styles

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
//counter styles
.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: ds-colors.$purple-100;

    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: ds-colors.$black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$purple-200;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: ds-colors.$green-500;

    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &::after {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$green-400;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: ds-colors.$orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$orange-100;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$orange-300;
    }
  }
}

.counter__input {
  @include ds-typography.r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: ds-colors.$black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset ds-shadows.$shadow-regular;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;
}
</style>
