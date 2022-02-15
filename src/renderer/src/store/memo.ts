import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { Memo } from '../types/global';

export const useMemoStore = defineStore('memo', () => {
  // 获取数据
  const memoJson: string | null = localStorage.getItem('memo');
  const memos: Ref<Memo[]> = ref<Memo[]>(memoJson ? JSON.parse(memoJson) : []);

  const __save = () => localStorage.setItem('memo', JSON.stringify(memos.value));

  const add = (memo: Memo) => {
    memos.value.push(memo);
    __save();
  }

  const set = (memo: Memo) => {
    for (let i = 0; i < memos.value.length; i++) {
      if (memos.value[i].id === memo.id) {
        memos.value[i] = memo;
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
    for (let i = 0; i < memos.value.length; i++) {
      if (memos.value[i].id === id) {
        memos.value.splice(i, 1);
        __save();
        return true;
      }
    }
    return false;
  }

  return { memos, add, set, del };
});
