import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { Task } from '../types/global';
import { MINUTES } from '../utils/dateUtil';

const updateTime = (task: Task) => {
  const nowDate: Date = new Date();
  if (task.dateTime === undefined || task.repeat === undefined) return;
  task.dateTime = new Date(task.dateTime);
  if (task.dateTime < nowDate) {
    const count: number = Math.ceil((nowDate.getTime() - task.dateTime.getTime()) / (task.repeat * MINUTES));
    task.dateTime = new Date(task.dateTime.getTime() + count * (task.repeat * MINUTES));
  }
}

export const useTaskStore = defineStore('task', () => {
  // 获取数据
  const taskJson: string | null = localStorage.getItem('task');
  const tasks: Ref<Task[]> = ref<Task[]>(taskJson ? JSON.parse(taskJson) : []);

  // 更新时间
  tasks.value.forEach(task => updateTime(task));

  const __save = () => localStorage.setItem('task', JSON.stringify(tasks.value));

  __save();

  const add = (task: Task) => {
    if (task.repeat !== 0) updateTime(task);
    tasks.value.push(task);
    __save();
  };

  const set = (task: Task) => {
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i].id === task.id) {
        updateTime(task);
        tasks.value[i] = task;
        __save();
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
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i].id === id) {
        tasks.value.splice(i, 1);
        __save();
        return true;
      }
    }
    return false;
  }

  return { tasks, add, set, del };
});
