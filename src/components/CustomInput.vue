<template>
  <input
    :type="type"
    :id="id"
    :value="modelValue"
    :required="isRequired"
    :placeholder="placeholder"
    class="custom-input"
    @input="emitInput"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['type', 'id', 'modelValue', 'isRequired', 'placeholder'])
const emit = defineEmits(['update:modelValue'])

const emitInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.custom-input {
  border-radius: 5px;
  padding: 9px 16px;
  border: 1px solid #ddd;
  color: #333;
  width: 100%;
}
</style>