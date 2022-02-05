import { defineStore } from 'pinia';
import { Todo } from '../../../types/global';
import { TodoState } from './types';

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => {
    // 获取数据
    const todoJson: string | null = localStorage.getItem('todo');
    const todos: Todo[] = todoJson ? JSON.parse(todoJson) : [];

    return { todos }
  },

  getters: {
    getTasks(state: TodoState): Todo[] {
      return state.todos;
    },
  },

  actions: {
    updateSettings(partial: Partial<TodoState[]>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    add(todo: Todo) {
      this.todos.push(todo);
      localStorage.setItem('todo', JSON.stringify(this.todos));
    },

    set(todo: Todo) {
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === todo.id) {
          this.todos[i] = todo;
          localStorage.setItem('todo', JSON.stringify(this.todos));
          return true;
        }
      }
      return false;
    },

    del(id: number | undefined) {
      if (id === undefined) {
        console.error('错误的id');
        return;
      }
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === id) {
          this.todos.splice(i, 1);
          localStorage.setItem('todo', JSON.stringify(this.todos));
          return true;
        }
      }
      return false;
    }
  }
});
