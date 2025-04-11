<template>
  <div class="user">
    <picture v-if="!isLoading">
      <source
        type="image/webp"
        :srcset="userImage"
      />
      <img
        :src="userImage"
        alt="Василий Ложкин"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user?.name }}</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>{{ user?.phone }}</span></p>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user.js';
import { getPublicImage } from '@/common/helpers.js';
import { computed } from 'vue';

const { user, isLoading } = storeToRefs(useUserStore());
const userImage = computed(() => user.value?.avatar ? getPublicImage(user.value?.avatar) : '');
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

//user styles

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include ds-typography.b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include ds-typography.b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

</style>
