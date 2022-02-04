import { defineStore } from 'pinia';
import { Task } from '../../../types/global';
import { MINUTES } from '../../../utils/dateUtil';
import { TaskState } from './types';

const updateTime = (task: Task) => {
  const nowDate: Date = new Date();
  if (task.dateTime === undefined || task.repeat === undefined) return;
  task.dateTime = new Date(task.dateTime);
  if (task.dateTime < nowDate) {
    const count: number = Math.ceil((nowDate.getTime() - task.dateTime.getTime()) / (task.repeat * MINUTES));
    task.dateTime = new Date(task.dateTime.getTime() + count * (task.repeat * MINUTES));
  }
}

export const useTaskStore = defineStore('task', {
  state: (): TaskState => {
    // 获取数据
    const taskJson: string | null = localStorage.getItem('task');
    const tasks: Task[] = taskJson ? JSON.parse(taskJson) : [];

    // 更新时间
    for (let i = 0; i < tasks.length; i++) updateTime(tasks[i]);

    localStorage.setItem('task', JSON.stringify(tasks));

    return { tasks }
  },

  getters: {
    getTasks(state: TaskState): Task[] {
      return state.tasks;
    },
  },

  actions: {
    updateSettings(partial: Partial<TaskState[]>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    add(task: Task) {
      updateTime(task);
      this.tasks.push(task);
      localStorage.setItem('task', JSON.stringify(this.tasks));
    },

    set(task: Task) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === task.id) {
          updateTime(task);
          this.tasks[i] = task;
          localStorage.setItem('task', JSON.stringify(this.tasks));
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
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) {
          this.tasks.splice(i, 1);
          localStorage.setItem('task', JSON.stringify(this.tasks));
          return true;
        }
      }
      return false;
    }
  }
});
