<script setup lang="ts">
import { AlarmClock, Calendar, Delete, Document, Edit, Refresh } from '@element-plus/icons-vue'
import { useTodoStore } from '../../store';
import { computed, ref } from 'vue';
import Drawer from './components/Drawer.vue';

const todoStore = useTodoStore();

const drawer = ref<InstanceType<typeof Drawer>>();

const isTimeout = computed(() => {
  return (date: Date): boolean => {
    date = new Date(date);
    return new Date().getTime() > date.getTime();
  }
});

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
  <el-card v-for="todo in todoStore.todos" :key="todo.id" :body-style="{padding: '12px 20px'}">
    <div class="todo-item">
      <el-checkbox v-model="todo.completion"/>
      <div class="todo-body">
        <div :class="{'todo-content': true, 'todo-content-finish': todo.completion}">{{ todo.title }}</div>
        <div class="todo-folder">
          <div
            :class="{'todo-time': true, 'todo-time-timeout': !todo.completion && isTimeout(todo.deadline)}"
            v-if="todo.deadline"
          >
            <el-icon><calendar /></el-icon>
            {{ dateFormat(todo.deadline) }}
          </div>
          <el-icon v-if="todo.remind" style="margin-left: 8px;"><alarm-clock /></el-icon>
          <el-icon v-if="todo.repeat" style="margin-left: 8px;"><refresh /></el-icon>
          <el-popover trigger="hover" placement="bottom-start">
            <template #reference>
              <el-icon v-if="todo.content.trim() !== ''" style="margin-left: 8px;"><document /></el-icon>
            </template>
            {{ todo.content }}
          </el-popover>
        </div>
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

.el-card {
  margin: 8px 0;
  min-width: 400px;
}

.todo-body {
  flex: 1;
  padding: 0 16px;
}

.todo-content-finish {
  text-decoration: line-through;
}

.todo-folder {
  display: flex;
}

.todo-time {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #5e5e5e;
}

.todo-time-timeout {
  color: #f56c6c;
}
</style>
