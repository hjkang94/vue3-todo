<template>
  <button v-if="!plain" type="submit" class="custom-button" :class="size" @click="click">
    <slot></slot>
  </button>

  <button v-if="plain" type="submit" class="plain-button" :class="size" @click="click">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['type', 'color', 'backgroundColor', 'width', 'size', 'plain'])
const emit = defineEmits(['click'])
const backgroundColor = props.backgroundColor || '#007bff'
const color = props.color || 'white'
const width = props.width || 'auto'
const plain = props.plain || false
const size = props.size || 'medium'

const click = () => {
  emit('click')
}
</script>

<style scoped>
.custom-button {
  background-color: v-bind(backgroundColor);
  width: v-bind(width);
  color: v-bind(color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.plain-button {
  background-color: transparent;
  width: v-bind(width);
  color: v-bind(color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.large {
  padding: 15px 20px;
  font-size: 1.2rem;
}

.medium {
  padding: 10px 16px;
  font-size: 0.9rem;
}

.small {
  padding: 5px;
  font-size: 0.8rem;
}
</style>