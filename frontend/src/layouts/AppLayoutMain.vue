<template>
  <div class="app_layout app_layout-main">
    <AppLayoutHeader />
    <slot></slot>
  </div>
</template>

<script setup>
import AppLayoutHeader from '@/layouts/AppLayoutHeader.vue';
</script>

<style scoped lang="scss">
.app_layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
