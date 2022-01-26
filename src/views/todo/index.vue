<script setup lang="ts">
import { Calendar, Delete, Edit } from '@element-plus/icons-vue'
import { useTodoStore } from '@/store';
import { ref } from 'vue';
import Drawer from './components/Drawer.vue';

const todoStore = useTodoStore();

const drawer = ref<InstanceType<typeof Drawer>>();

const dateFormat = (date: Date): string => {
  date = new Date(date);
  const days: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  let res: string = '';
  if (date.getFullYear() !== new Date().getFullYear()) {
    res += date.getFullYear() + '年';
  }
  res += date.getMonth() + 1 + '月';
  res += date.getDate() + '日';
  res += days[date.getDay()];
  res += ' ' + (date.getHours() >= 12 ? '下午' : '上午') + date.getHours() % 12;
  res += ':' + date.getMinutes();
  return res;
};
</script>

<template>
  <h1>计划</h1>
  <el-button @click="drawer?.open(null)">添加计划</el-button>
  <el-card v-for="todo in todoStore.todos" :key="todo.id" size="large">
    <div class="todo-item">
      <el-checkbox v-model="todo.completion"/>
      <div class="todo-body">
        <div class="todo-content">{{ todo.content }}</div>
        <div class="todo-time" v-if="todo.deadline"><el-icon><calendar /></el-icon>{{ dateFormat(todo.deadline) }}</div>
      </div>
      <el-button type="primary" :icon="Edit" size="small" circle @click="drawer?.open(todo)" />
      <el-button type="danger" :icon="Delete" size="small" circle @click="todoStore.del(todo.id)" />
    </div>
  </el-card >

  <Drawer ref="drawer" />
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
}

.todo-body {
  flex: 1;
  padding: 0 16px;
}

.todo-time {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #5e5e5e;
}
</style>
