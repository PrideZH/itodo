import { defineStore } from 'pinia';
import { Affair } from '../../../types/global';
import { AffairState } from './types';

export const useAffairStore = defineStore('affair', {
  state: (): AffairState => {
    // 获取数据
    const affairJson: string | null = localStorage.getItem('affair');
    const affairs: Affair[] = affairJson ? JSON.parse(affairJson) : [];

    localStorage.setItem('affair', JSON.stringify(affairs));

    return { affairs }
  },

  getters: {
    getAffairs(state: AffairState): Affair[] {
      return state.affairs;
    },
  },

  actions: {
    updateSettings(partial: Partial<AffairState[]>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    add(task: Affair) {
      this.affairs.push(task);
      localStorage.setItem('affair', JSON.stringify(this.affairs));
    },

    set(task: Affair) {
      for (let i = 0; i < this.affairs.length; i++) {
        if (this.affairs[i].id === task.id) {
          this.affairs[i] = task;
          localStorage.setItem('affair', JSON.stringify(this.affairs));
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
      for (let i = 0; i < this.affairs.length; i++) {
        if (this.affairs[i].id === id) {
          this.affairs.splice(i, 1);
          localStorage.setItem('affair', JSON.stringify(this.affairs));
          return true;
        }
      }
      return false;
    }
  }
});
