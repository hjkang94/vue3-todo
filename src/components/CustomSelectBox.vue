<template>
  <select class="custom-selectbox" :value="modelValue" @change="handleChange">
    <option v-for="option in options" :key="option.key" :value="option.key">
      {{ option.value }}
    </option>
  </select>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'

const props = defineProps(['modelValue', 'options'])
const emit = defineEmits(['update:modelValue', 'change'])

const isActive = ref(false)

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event.target.value)
}
</script>

<style scoped>
.custom-selectbox {
  border-radius: 5px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  cursor: pointer;
  color: #333;
}
</style>