import { createRouter, createWebHashHistory } from 'vue-router';

import PageLayout from '../layout/page-layout.vue';

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    {
      path: '/',
      redirect: 'todo',
    },
    {
      name: "root",
      path: "/",
      component: PageLayout,
      children: [
        {
          path: 'todo',
          name: 'todo',
          component: () => import('../views/todo/index.vue')
        },
        {
          path: 'affair',
          name: 'affair',
          component: () => import('../views/affair/index.vue')
        },
        {
          path: 'task',
          name: 'task',
          component: () => import('../views/task/index.vue')
        }
      ]
    },
  ],
});

export default router;

