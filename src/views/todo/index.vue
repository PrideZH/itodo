<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue'
import { useTodoStore } from '@/store';
import { ref } from 'vue';
import Drawer from './components/Drawer.vue';

const todoStore = useTodoStore();

const drawer = ref<any>();
</script>

<template>
  <h1>今天计划</h1>
  <el-button @click="drawer.open()">添加计划</el-button>
  <el-card v-for="todo in todoStore.todos" :key="todo.id" size="large">
    <div class="todo-item">
      <el-checkbox v-model="todo.completion"/>
      <div class="todo-body">
        <div class="todo-content">{{ todo.content }}</div>
        {{ todo.deadline }}
      </div>
      <el-button type="primary" :icon="Edit" size="small" circle @click="drawer.open(todo)" />
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
</style>
