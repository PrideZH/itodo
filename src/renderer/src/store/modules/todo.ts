import { defineStore } from 'pinia';
import { Todo } from '../../types/global';
import { ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {

  const todos = ref<Todo[]>([]);

  // 加载数据
  const load = (): void =>  {
    const todosJson: string = window.fs.readFileSync('todo.json', 'utf8');
    todos.value = todos ? JSON.parse(todosJson) : [];
  };

  const save = (): void => {
    window.fs.writeFileSync('todo.json', JSON.stringify(todos.value, null,"\t"));
  };

  const add = (todo: Todo): void => {
    todos.value.push(todo);
    save();
  };

  const set = (todo: Todo): boolean => {
    for (let i = 0; i < todos.value.length; i++) {
      if (todos.value[i].id === todo.id) {
        todos.value[i] = todo;
        save();
        return true;
      }
    }
    return false;
  }

  const del = (id: number | undefined): boolean => {
    if (id === undefined) return false;
    for (let i = 0; i < todos.value.length; i++) {
      if (todos.value[i].id === id) {
        todos.value.splice(i, 1);
        save();
        return true;
      }
    }
    return false;
  };

  return {
    todos,
    load,
    save,
    add,
    set,
    del
  }
});
