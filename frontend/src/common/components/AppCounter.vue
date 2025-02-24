<template>
  <button
    type="button"
    class="counter__button counter__button--minus"
    :disabled="!modelValue"
    @click="$emit('update:modelValue', modelValue - 1)"
  >
    <span class="visually-hidden">Меньше</span>
  </button>
  <input
    type="number"
    name="counter"
    class="counter__input"
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value));"
  />
  <button
    type="button"
    :class="['counter__button', 'counter__button--plus', {'counter__button--orange': orange}]"
    :disabled="modelValue === maxCount"
    @click="$emit('update:modelValue', modelValue + 1)"
  >
    <span class="visually-hidden">Больше</span>
  </button>
</template>

<script setup>
defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  maxCount: {
    type: [Number, null],
    default: null,
  },
  orange: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/mixins/m_center";
@use "@/assets/scss/ds-system/ds-shadows";
@use '@/assets/scss/ds-system/ds-typography';

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

//ingredients styles
.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
