export default {
  path: 'todo',
  name: 'todo',
  component: () => import('../../views/todo/index.vue'),
  meta: {
    locale: '计划',
    icon: 'icon-todo',
  },
};
