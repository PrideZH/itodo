export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale: '工作区',
    icon: 'icon-dashboard',
  },
  children: [
  ],
};
