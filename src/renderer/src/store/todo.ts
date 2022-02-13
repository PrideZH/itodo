import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Todo } from '../types/global';

const cmp = (a: Todo, b: Todo) => {
  if (a.completionTime === null && a.completionTime === null) {
    return a.star ? -1 : 1;
  } else if (a.completionTime !== null && b.completionTime !== null) {
    return b.completionTime.getTime() - a.completionTime.getTime();
  }
  return a.completionTime === null ? 1 : -1;
}

export const useTodoStore = defineStore('todo', () => {
  // 获取数据
  const todoJson: string | null = localStorage.getItem('todo');
  const todos: Ref<Todo[]> = ref<Todo[]>(todoJson ? JSON.parse(todoJson) : []);

  todos.value.forEach(todo => todo.completionTime !== null ? todo.completionTime = new Date(todo.completionTime) : null);

  todos.value.sort(cmp);

  const __save = () => localStorage.setItem('todo', JSON.stringify(todos.value));

  const add = (todo: Todo) => {
    todos.value.unshift(todo);
    __save();
  };

  const set = (todo: Todo) => {
    for (let i = 0; i < todos.value.length; i++) {
      if (todos.value[i].id === todo.id) {
        todos.value[i] = todo;
        __save();
        todos.value.sort(cmp);
        return true;
      }
    }
    return false;
  };

  const del = (id: number | undefined) => {
    if (id === undefined) {
      console.error('错误的id');
      return;
    }
    for (let i = 0; i < todos.value.length; i++) {
      if (todos.value[i].id === id) {
        todos.value.splice(i, 1);
        localStorage.setItem('todo', JSON.stringify(todos.value));
        return true;
      }
    }
    return false;
  };

  const clearDone = (): number => {
    let cnt = 0;
    todos.value = todos.value.filter(todo => {
      if (todo.completion) cnt++;
      return !todo.completion;
    });
    __save();
    return cnt;
  };

  return { todos, add, set, del, clearDone };
});
