import { defineStore } from 'pinia';
import { Todo } from '../../../types/global';
import { TodoState } from './types';

const cmp = (a: Todo, b: Todo) => {
  if (a.completionTime === null) return 1;
  if (b.completionTime === null) return -1;
  return b.completionTime.getTime() - a.completionTime.getTime();
}

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => {
    // 获取数据
    const todoJson: string | null = localStorage.getItem('todo');
    const todos: Todo[] = todoJson ? JSON.parse(todoJson) : [];
    todos.forEach(todo => todo.completionTime !== null ? todo.completionTime = new Date(todo.completionTime) : null);

    todos.sort(cmp);

    return { todos }
  },

  getters: {
    getTodos(state: TodoState): Todo[] {
      return state.todos;
    },
  },

  actions: {
    updateSettings(partial: Partial<TodoState[]>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    add(todo: Todo) {
      this.todos.unshift(todo);
      localStorage.setItem('todo', JSON.stringify(this.todos));
    },

    set(todo: Todo) {
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === todo.id) {
          this.todos[i] = todo;
          localStorage.setItem('todo', JSON.stringify(this.todos));
          this.todos.sort(cmp);
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
    },

    clearDone() {
      this.todos = this.todos.filter(todo => !todo.completion);
      localStorage.setItem('todo', JSON.stringify(this.todos));
    }
  }
});
