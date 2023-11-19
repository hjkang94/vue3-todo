<template>
  <RouterLink to="/todo" class="tab-link" :class="{ active: $route.path === '/todo' }">
    목록
  </RouterLink>
  <RouterLink to="/about" class="tab-link" :class="{ active: $route.path === '/about' }">
    소개
  </RouterLink>
</template>

<script setup>
</script>

<style scoped>
.tab-link {
  padding: 20px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.tab-link.active {
  color: #007bff;
}
</style>