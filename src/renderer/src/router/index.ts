import { createRouter, createWebHashHistory } from 'vue-router';

import PageLayout from '../layout/page-layout.vue';

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    {
      path: '/',
      redirect: 'task',
    },
    {
      name: "root",
      path: "/",
      component: PageLayout,
      children: [
        {
          path: 'todo',
          name: 'todo',
          component: () => import('../views/todo/index.vue'),
          meta: {
            locale: '计划',
            icon: 'icon-dashboard'
          }
        },
        {
          path: 'event',
          name: 'event',
          component: () => import('../views/event/index.vue'),
          meta: {
            locale: '事件',
            icon: 'icon-dashboard'
          }
        },
        {
          path: 'task',
          name: 'task',
          component: () => import('../views/task/index.vue'),
          meta: {
            locale: '任务',
            icon: 'icon-dashboard'
          }
        }
      ]
    },
  ],
});

export default router;

