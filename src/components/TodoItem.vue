<template>
  <Card v-if="!isShowTodoForm" @click="showTodoForm">
    <div class="todo-item">
      <div class="todo-area">
        <h2 class="truncate">{{ todo.title }}</h2>
        <p>{{ formattedDate }}</p>
      </div>
      <div class="todo-area">
        <p class="truncate">{{ todo.content }}</p>
        <p>{{ selectedStatus }}</p>
      </div>
    </div>
  </Card>
  <TodoForm
    v-if="isShowTodoForm"
    :todoId="todoId"
    @showTodoForm="showTodoForm"
    :statuses="statuses"
  />
</template>

<script setup>
import dayjs from 'dayjs'
import { ref, defineProps, computed } from 'vue'
import Card from './Card.vue'
import TodoForm from '../components/TodoForm.vue'

const props = defineProps(['todo', 'statuses'])
const todoId = props.todo.id
const isShowTodoForm = ref(false)

const showTodoForm = () => {
  isShowTodoForm.value = !isShowTodoForm.value
}

const selectedStatus = computed(() => {
  const status = props.statuses.find((status) => status.key === props.todo.status)
  return status ? status.value : ''
})

const formattedDate = computed(() => {
  return dayjs(props.todo.date).format('YYYY.MM.DD')
})
</script>

<style scoped>
.todo-item {
  font-size: 0.9em;
}

.todo-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.button-area {
  display: flex;
  justify-content: center;
  align-items: center;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
}
</style>