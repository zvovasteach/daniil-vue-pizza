<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizeItems"
          :key="size.id"
          :class="`diameter__input diameter__input--${size.value}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.value"
            class="visually-hidden"
            :checked="modelValue.value === size.value"
            @change="$emit('update:modelValue', size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  sizeItems: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/mixins/m_center";
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
//diameter styles
.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include ds-typography.r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include m_center.p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: ds-colors.$green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: ds-shadows.$shadow-large;
    }
  }
}
</style>
