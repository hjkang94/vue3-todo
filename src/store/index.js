import { createStore } from "vuex";


export default createStore({
  state: {
    selectedCategory: 'title',
    todos: [{
      id: 1,
      title: 'Todo 1',
      content: 'Content 1',
      status: 'notStarted',
      date: '2023-12-12',
    }],
  },

  mutations: {
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    addTodo(state, todo) {
      state.todos = [todo, ...state.todos];
    },
    updateTodo(state, todo) {
      const todos = state.todos.map((t) => (t.id === todo.id ? todo : t));
      state.todos = todos;
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((t) => t.id !== id);
    }
  },

  actions: {
    updateSelectedCategory({ commit }, category) {
      commit('setSelectedCategory', category);
    },
    addTodo({ commit }, todo) {
      commit('addTodo', todo);
    },
    updateTodo({ commit }, todo) {
      commit('updateTodo', todo);
    },
    deleteTodo({ commit }, id) {
      commit('deleteTodo', id);
    }
  },

  getters: {
    getTodoById: (state) => (id) => state.todos.find((t) => t.id === id),
  },
});
