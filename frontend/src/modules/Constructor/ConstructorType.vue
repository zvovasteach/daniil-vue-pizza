<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in doughItems"
          :key="dough.id"
          :class="`dough__input dough__input--${dough.value}`"
        >
          <input
            type="radio"
            name="dough"
            :value="dough.value"
            class="visually-hidden"
            :checked="modelValue.value === dough.value"
            @change="$emit('update:modelValue', dough)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
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
  doughItems: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";
@use "@/assets/scss/ds-system/ds-colors";
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
//dough styles
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include ds-typography.r-s16-h19;

    &::before {
      @include m_center.p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include ds-typography.l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: ds-shadows.$shadow-large;
    }
  }
}

</style>
