<template>
  <div class="card">
    <div class="card-area">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 10px;
  width: 100%;
}
.card-area {
  padding: 15px;
}
</style>