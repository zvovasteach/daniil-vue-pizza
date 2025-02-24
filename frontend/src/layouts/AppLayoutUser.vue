<template>
  <div class="app_layout app_layout-user">
    <AppLayoutHeader />
    <AppLayoutSidebar />
    <slot></slot>
  </div>
</template>

<script setup>
import AppLayoutHeader from '@/layouts/AppLayoutHeader.vue';
import AppLayoutSidebar from '@/layouts/AppLayoutSidebar.vue';
</script>

<style scoped lang="scss">
.app_layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
