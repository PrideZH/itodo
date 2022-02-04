<script setup lang="ts">
import { Calendar, Delete, Edit } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
import ListItem from '../../components/ListItem.vue';
import { useTaskStore } from '../../store';
import Drawer from './components/Drawer.vue';

const drawer = ref<InstanceType<typeof Drawer>>();

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.getTasks);

const dateFormat = (date: Date): string => {
  date = new Date(date);
  const nowDate = new Date();

  let res: string = '';
  if (!(nowDate.getDate() === date.getDate()
      && nowDate.getMonth() === date.getMonth()
      && nowDate.getFullYear() === date.getFullYear())) {
    const days: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    if (date.getFullYear() !== new Date().getFullYear()) {
      res += date.getFullYear() + '年';
    }
    res += date.getMonth() + 1 + '月';
    res += date.getDate() + '日';
    res += days[date.getDay()];
  }
  res += ' ' + (date.getHours() >= 12 ? '下午' : '上午') + ('0' + date.getHours() % 12).slice(-2);
  res += ':' + ('0' + date.getMinutes()).slice(-2);;
  return res;
};
</script>

<template>
  <el-button @click="drawer?.open(null)">添加任务</el-button>

  <ListItem v-for="task in tasks" :key="task.id">
    <template #header>
      <el-checkbox v-model="task.enable" @change="taskStore.set(task)" />
    </template>
    <div>{{ task.content }}</div>
    <div class="task-time" v-if="task.enable && task.dateTime">
      <el-icon><Calendar /></el-icon>
      {{ dateFormat(task.dateTime) }}
    </div>
    <template #footer>
      <el-button type="primary" :icon="Edit" size="small" circle @click="drawer?.open(task)" />
      <el-button type="danger" :icon="Delete" size="small" circle @click="taskStore.del(task.id)" />
    </template>
  </ListItem>

  <Drawer ref="drawer" />
</template>

<style scoped>
.task-time {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #5e5e5e;
}
</style>
