import {ref} from 'vue'
import {defineStore} from 'pinia'

class Todo {
  constructor(id, title, author) {
    this.id = id
    this.title = title
    this.author = author
  }
}

function createEmptyTodo() {
  return new Todo(-1, '', '')
}

const todoRoot = 'todo'
const todoPrefix = 'todo_'

export const useTodoStore = defineStore('todo', () => {
  const todoList = ref([])

  function readAllTodo() {
    const sizeOfTodoList = __getSizeOfTodoList()
    const ids = Array.from(Array(sizeOfTodoList).keys())
    todoList.value = ids
        .map(id => {
          const storageKey = __getTodoStorageKey(id)
          const todo = localStorage.getItem(storageKey)
          if (todo === null) return null
          const todoObject = JSON.parse(todo)
          return new Todo(todoObject['id'], todoObject['title'], todoObject['author'])
        })
        .filter(todo => todo !== null)
  }

  function saveTodo(title, author) {
    const todoSize = __getSizeOfTodoList()
    const todo = new Todo(todoSize, title, author)

    const _id = __getTodoStorageKey(__getSizeOfTodoList())
    const newSizeOfTodo = __getSizeOfTodoList() + 1
    localStorage.setItem(_id, JSON.stringify(todo))
    localStorage.setItem('todo', newSizeOfTodo.toString(10))
    todoList.value.push(todo)
  }

  function clearAll() {
    todoList.value.length = 0
    localStorage.clear()
  }

  function __getSizeOfTodoList() {
    const todoSize = localStorage.getItem(todoRoot)

    return todoSize === null ? 0 : Number.parseInt(todoSize, 10)
  }

  function __getTodoStorageKey(id) {
    return todoPrefix + id.toString(10)
  }

  return { todoList, readAllTodo, saveTodo, clearAll }
})
