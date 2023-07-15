<script setup>
import {useTodoStore} from "@/stores/todo";
import {onMounted, ref} from "vue";

const todoStore = useTodoStore()
const author = ref('')
const title = ref('')

onMounted(() => {
  todoStore.readAllTodo()
})

function saveTodo() {
  todoStore.saveTodo(title.value, author.value)
}
</script>

<template>
  <button @click="todoStore.clearAll">RESET</button>
  <input type="text" v-model="author" @keydown.enter="saveTodo" placeholder="author">
  <input type="text" v-model="title" @keydown.enter="saveTodo" placeholder="title">
  <table>
    <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Author</th>
    </tr>
    </thead>
    <tr v-for="todo in todoStore.todoList">
      <td>{{todo.id}}</td>
      <td>{{todo.title}}</td>
      <td>{{todo.author}}</td>
    </tr>
  </table>
</template>
