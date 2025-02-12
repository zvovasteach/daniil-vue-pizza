<template>
  <label class="input">
    <span :class="[{'visually-hidden' : hidden}, {'button--big-label': bigLabel}]">{{ label }}</span>
    <input
      v-bind="$attrs"
      v-model="inputModel"
      type="text"
      :name="inputName"
    />
    <span
      v-if="error"
      class="text-field__error"
    >
      {{ error }}
    </span>
  </label>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});
defineProps({
  label: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  bigLabel: {
    type: Boolean,
    default: false,
  },
  inputName: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
});
const inputModel = defineModel({ type: String, default: '' });
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

//input styles
.input {
  display: block;

  span {
    @include ds-typography.r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include ds-typography.r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: ds-colors.$black;
    border: 1px solid ds-colors.$purple-400;
    border-radius: 8px;
    outline: none;
    background-color: ds-colors.$white;

    font-family: inherit;

    &:focus {
      border-color: ds-colors.$green-500;
    }
  }

  &:hover {
    input {
      border-color: ds-colors.$black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include ds-typography.b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
.text-field__error {
  color: red;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  position: absolute;
  width: 230px;
}
</style>
