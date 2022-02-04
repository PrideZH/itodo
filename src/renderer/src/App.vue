<script setup lang="ts">
import { MINUTES } from './utils/dateUtil';
import { computed } from 'vue';
import { notice } from './utils/noticeUtil';
import { useTaskStore } from './store';

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.getTasks);

// 在整分启动定时 每一分钟检测事件
setTimeout(() => {
  setInterval(() => {
    const nowDate = new Date();
    tasks.value.forEach(task => {
      if (!task.enable || task.dateTime === undefined) return;
      if (task.dateTime <= nowDate) {
        notice('任务提醒', task.content || '');
        if (task.repeat === undefined || task.repeat === 0) {
          taskStore.del(task.id);
        } else {
          taskStore.set(task);
        }
      }
    });
  }, MINUTES);
}, MINUTES - new Date().getMilliseconds());
</script>

<template>
  <router-view />
</template>

<style>
body, #app {
  height: 100vh;
  margin: 0;
}
</style>
