<template>
  <Card>
    <form class="todo-form" @submit.prevent="saveTodo">
      <CustomInput
        v-model="newItem.title"
        id="title"
        type="text"
        :isRequired="true"
        placeholder="제목을 입력하세요"
      />
      <div class="error-area">
        <span v-if="!isValidTitle" class="error-message">* 제목을 입력하세요</span>
      </div>

      <textarea
        id="content"
        v-model="newItem.content"
        required
        placeholder="설명을 입력하세요"
      ></textarea>
      <div class="error-area">
        <span v-if="!isValidContent" class="error-message">* 설명을 입력하세요</span>
      </div>

      <div class="row-area">
        <div class="row-first-item">
          <CustomInput v-model="newItem.date" id="date" type="date" />
          <div class="error-area">
            <span v-if="!isValidDate" class="error-message">* 날짜를 입력하세요</span>
          </div>
        </div>

        <select class="row-second-item" id="status" v-model="newItem.status" required>
          <option v-for="status in statuses" :key="status.key" :value="status.key">
            {{ status.value }}
          </option>
        </select>
      </div>

      <div class="button-area">
        <CustomButton type="submit" :backgroundColor="todoId ? '#8ecf33' : null">
          {{ todoId ? '수정' : '추가' }}
        </CustomButton>
        <CustomButton @click="closeTodoForm" type="button" backgroundColor="#858585">
          취소
        </CustomButton>
      </div>
    </form>
  </Card>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CustomInput from '../components/CustomInput.vue'
import CustomButton from './CustomButton.vue'
import Card from './Card.vue'
import dayjs from 'dayjs'

const store = useStore()
const router = useRouter()
const emit = defineEmits(['toggleTodoForm'])
const props = defineProps(['todoId', 'statuses'])
const todoId = props.todoId
const regexDate = /^\d{4}-\d{2}-\d{2}$/
const newItem = ref({
  title: '',
  content: '',
  date: '',
  status: 'notStarted'
})
const isValidTitle = computed(() => newItem.value.title.trim() !== '')
const isValidContent = computed(() => newItem.value.content.trim() !== '')
const isValidDate = computed(() => {
  const date = newItem.value.date.trim()
  return date !== '' && regexDate.test(date) && dayjs(date, 'YYYY-MM-DD', true).isValid()
})

onMounted(() => {
  if (todoId) {
    const todo = store.getters.getTodoById(todoId)
    if (todo) {
      newItem.value = { ...todo }
    } else {
      router.push({ name: 'error' })
    }
  }
})

const generateId = (todos) => {
  return Math.max(...todos.map((t) => t.id), 0) + 1
}

const saveTodo = () => {
  if (!isValidTitle.value || !isValidContent.value || !isValidDate.value) {
    return
  }

  if (todoId) {
    store.dispatch('updateTodo', newItem.value)
  } else {
    newItem.value.id = generateId(store.state.todos)
    store.dispatch('addTodo', newItem.value)
  }

  emit('toggleTodoForm')
}

const closeTodoForm = () => {
  emit('toggleTodoForm')
}
</script>

<style scope>
.todo-form input[type='text'],
.todo-form textarea,
.todo-form input[type='date'],
.todo-form select {
  width: 100%;
  padding: 10px;
  margin-top: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.todo-form textarea {
  height: 100px;
}

.row-area {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}

.error-area {
  text-align: right;
}
.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.button-area {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.row-first-item {
  flex: 2;
}
.row-second-item {
  flex: 1;
}
</style>