<template>
  <button
    type="button"
    class="button"
    :class="[
      {'button--border': outlined},
      icon ? `button--${icon}` : '',
      {'button--transparent': transparent},
      {'button--white': white}
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  outlined: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  white: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
//button styles

.button {
  $bl: &;

  @include ds-typography.b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: ds-colors.$white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: ds-shadows.$shadow-medium;

  background-color: ds-colors.$green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: ds-colors.$green-400;
  }

  &:active:not(:disabled) {
    background-color: ds-colors.$green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: ds-colors.$green-300;
    color: rgba(ds-colors.$white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid ds-colors.$green-500;
    color: ds-colors.$black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$green-500;
      border-color: ds-colors.$green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: ds-colors.$green-600;
      border-color: ds-colors.$green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include ds-typography.b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: ds-colors.$black;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: ds-colors.$red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: ds-colors.$white;
    color: ds-colors.$green-500;
  }
}

</style>
