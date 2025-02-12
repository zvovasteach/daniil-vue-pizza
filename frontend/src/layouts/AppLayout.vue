<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>

<script setup>
import { AppLayout } from '@/common/constants';
import { defineAsyncComponent, markRaw, computed } from 'vue';
import { useRoute } from 'vue-router';

const AppLayoutDefault = markRaw(
  defineAsyncComponent(() => import('./AppLayoutDefault.vue')),
);
const AppLayoutMain = markRaw(
  defineAsyncComponent(() => import('./AppLayoutMain.vue')),
);
const AppLayoutUser = markRaw(
  defineAsyncComponent(() => import('./AppLayoutUser.vue')),
);

const route = useRoute();

const layout = computed(() => {
  const metaLayout = route.meta.layout;
  switch (metaLayout) {
    case AppLayout.DEFAULT:
      return AppLayoutDefault;
    case AppLayout.MAIN:
      return AppLayoutMain;
    case AppLayout.USER:
      return AppLayoutUser;
    default:
      return AppLayoutDefault;
  }
});
</script>
