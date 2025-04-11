<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <ConstructorFillingItem
        v-for="ingredient in ingredientsFilling"
        :key="ingredient.ingredientId"
        :ingredient="ingredient"
        :filling-items="fillingItems"
        @update:filling-items="$emit('update:fillingItems', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import ConstructorFillingItem from '@/modules/Constructor/ConstructorFillingItem.vue';
defineEmits(['update:fillingItems']);
defineProps({
  ingredientsFilling: {
    type: Object,
    required: true,
  },
  fillingItems: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/mixins/m_center";
@use "@/assets/scss/ds-system/ds-shadows";
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
