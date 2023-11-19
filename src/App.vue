<template>
  <header>
    <h2>TODO LIST</h2>
  </header>

  <nav>
    <TabMenu />
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<script setup>
import TabMenu from '@/components/TabMenu.vue'
</script>

<style scoped>
header h2 {
  text-align: center;
  margin-top: 30px;
}

main {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

nav {
  display: flex;
  justify-content: center;
}
</style>
