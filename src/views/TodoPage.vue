<template>
  <div class="todo-container">
    <div class="filter-container">
      <CustomSelectBox
        v-model="selectedCategory"
        :options="categories"
        @change="updateSelectedCategory"
      />
      <CustomInput v-model="searchText" type="text" placeholder="검색어를 입력하세요" />
    </div>
    <CustomButton v-if="!isShowTodoForm" @click="showTodoForm" width="100%">추가</CustomButton>

    <TodoForm v-if="isShowTodoForm" @showTodoForm="showTodoForm" :statuses="statuses" />

    <div class="todo-list">
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" :statuses="statuses" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import TodoItem from '../components/TodoItem.vue'
import TodoForm from '../components/TodoForm.vue'
import CustomInput from '../components/CustomInput.vue'
import CustomSelectBox from '../components/CustomSelectBox.vue'
import CustomButton from '../components/CustomButton.vue'

const store = useStore()

const selectedCategory = ref(store.state.selectedCategory)
const todos = computed(() => store.state.todos)

const isShowTodoForm = ref(false)
const statuses = [
  {
    key: 'notStarted',
    value: '진행 전'
  },
  {
    key: 'inProgress',
    value: '진행 중'
  },
  {
    key: 'done',
    value: '완료'
  }
]

const filteredTodos = computed(() => {
  if (searchText.value) {
    return todos.value.filter((todo) => todo[selectedCategory.value].includes(searchText.value))
  } else {
    return todos.value
  }
})

const searchText = ref('')
const categories = [
  {
    key: 'title',
    value: '제목'
  },
  {
    key: 'content',
    value: '설명'
  },
  {
    key: 'status',
    value: '상태'
  },
  {
    key: 'date',
    value: '날짜'
  }
]

const updateSelectedCategory = () => {
  store.dispatch('updateSelectedCategory', selectedCategory.value)
}

const showTodoForm = () => {
  isShowTodoForm.value = !isShowTodoForm.value
}
</script>

<style scoped>
.todo-container {
  width: 400px;
}
.filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.todo-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
}
</style>