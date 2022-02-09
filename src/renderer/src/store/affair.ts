import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { Affair } from '../types/global';

export const useAffairStore = defineStore('affair', () => {
  // 获取数据
  const affairJson: string | null = localStorage.getItem('affair');
  const affairs: Ref<Affair[]> = ref<Affair[]>(affairJson ? JSON.parse(affairJson) : []);

  const __save = () => localStorage.setItem('affair', JSON.stringify(affairs.value));

  const add = (task: Affair) => {
    affairs.value.push(task);
    __save();
  }

  const set = (task: Affair) => {
    for (let i = 0; i < affairs.value.length; i++) {
      if (affairs.value[i].id === task.id) {
        affairs.value[i] = task;
        __save();
        return true;
      }
    }
    return false;
  }

  const del = (id: number | undefined) => {
    if (id === undefined) {
      console.error('错误的id');
      return;
    }
    for (let i = 0; i < affairs.value.length; i++) {
      if (affairs.value[i].id === id) {
        affairs.value.splice(i, 1);
        __save();
        return true;
      }
    }
    return false;
  }

  return { affairs, add, set, del };
});
