<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <label
      v-for="sauce in sauceItems"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.value"
        :checked="modelValue.value === sauce.value"
        @change="$emit('update:modelValue', sauce)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  sauceItems: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/mixins/m_center";
//radio styles

.radio {
  cursor: pointer;

  span {
    @include ds-typography.r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include m_center.p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid ds-colors.$purple-400;
      border-radius: 50%;
      background-color: ds-colors.$white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: ds-colors.$purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid ds-colors.$green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: ds-colors.$purple-400;
          background-color: ds-colors.$silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid ds-colors.$purple-400;
        }
      }
    }
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
</style>
