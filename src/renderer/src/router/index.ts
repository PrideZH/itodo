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
            icon: ['M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z']
          }
        },
        {
          path: 'affair',
          name: 'affair',
          component: () => import('../views/affair/index.vue'),
          meta: {
            locale: '事情',
            icon: ['M128 384v512h768V192H768v32a32 32 0 11-64 0v-32H320v32a32 32 0 01-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1164 0v32h160a32 32 0 0132 32v768a32 32 0 01-32 32H96a32 32 0 01-32-32V160a32 32 0 0132-32h160V96a32 32 0 0164 0v32zm-32 384h64a32 32 0 010 64h-64a32 32 0 010-64zm0 192h64a32 32 0 110 64h-64a32 32 0 110-64zm192-192h64a32 32 0 010 64h-64a32 32 0 010-64zm0 192h64a32 32 0 110 64h-64a32 32 0 110-64zm192-192h64a32 32 0 110 64h-64a32 32 0 110-64zm0 192h64a32 32 0 110 64h-64a32 32 0 110-64z']
          }
        },
        {
          path: 'task',
          name: 'task',
          component: () => import('../views/task/index.vue'),
          meta: {
            locale: '任务',
            icon: [
              'M512 832a320 320 0 100-640 320 320 0 000 640zm0 64a384 384 0 110-768 384 384 0 010 768z',
              'M292.288 824.576l55.424 32-48 83.136a32 32 0 11-55.424-32l48-83.136zm439.424 0l-55.424 32 48 83.136a32 32 0 1055.424-32l-48-83.136zM512 512h160a32 32 0 110 64H480a32 32 0 01-32-32V320a32 32 0 0164 0v192zM90.496 312.256A160 160 0 01312.32 90.496l-46.848 46.848a96 96 0 00-128 128L90.56 312.256zm835.264 0A160 160 0 00704 90.496l46.848 46.848a96 96 0 01128 128l46.912 46.912z'
            ]
          }
        }
      ]
    },
  ],
});

export default router;

