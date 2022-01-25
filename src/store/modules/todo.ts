import { defineStore } from 'pinia';
import { Todo } from '@/types/global';

export const useTodoStore = defineStore('user', {
  state: (): Todo[] => ([
    {
      id: 1,
      title: 'title',
      content: 'content',
      color: 'default',
      remindTime: null,
      deadline: null,
      repeat: false,
      repeatTime: null,
      completion: false,
      remark: '',
    },
    {
      id: 2,
      title: 'title2',
      content: 'content2',
      color: 'default',
      remindTime: null,
      deadline: null,
      repeat: false,
      repeatTime: null,
      completion: false,
      remark: '',
    }
  ]),

  getters: {
    userInfo(state: Todo[]): Todo[] {
      return { ...state };
    },
  },

  actions: {
    add() {},

    del() {},
  },
});
