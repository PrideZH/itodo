import { defineStore } from 'pinia';
import { Todo } from '@/types/global';
import { ref } from 'vue';
const fs = window.require('fs');

export const useTodoStore = defineStore('todo', () => {

  const todos = ref<Todo[]>([]);

  // 加载数据
  const load = (): void =>  {
    const todosBuf: string = fs.readFileSync('./public/todo.json', 'utf8');
    todos.value = todos ? JSON.parse(todosBuf) : [];
  };

  const add = (todo: Todo): void => {
    todos.value.push(todo);
    fs.writeFileSync('./public/todo.json', JSON.stringify(todos.value));
  };

  const del = (id: number): boolean => {
    for (let i = 0; i < todos.value.length; i++) {
      if (todos.value[i].id === id) {
        todos.value.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  return {
    todos,
    load,
    add,
    del
  }
});
