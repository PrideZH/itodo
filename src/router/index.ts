import { createRouter, createWebHashHistory } from 'vue-router'

import PageLayout from '@/layout/page-layout.vue';
import appRoutes from './modules';

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
    },
    {
      name: "root",
      path: "/",
      component: PageLayout,
      children: appRoutes,
    },
  ],
});

export default router;

