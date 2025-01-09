<template>
  <div class="app_layout">
    <AppLayoutHeader />
    <slot></slot>
  </div>
</template>

<script setup>
import AppLayoutHeader from '@/layouts/AppLayoutHeader.vue';
</script>

<style scoped lang="scss">

</style>
