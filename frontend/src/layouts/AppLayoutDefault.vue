<template>
  <div class="app_layout app_layout-default">
    <slot></slot>
  </div>
</template>
<style scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
