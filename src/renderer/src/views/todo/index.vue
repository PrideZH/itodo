<script setup lang="ts">
import { AlarmClock, Calendar, Delete, Document, Edit, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useTodoStore } from '../../store';
import Drawer from './components/Drawer.vue';
import TodoItem from './components/TodoItem.vue';
import ListItem from '../../components/ListItem.vue';

const todoStore = useTodoStore();

const drawer = ref<InstanceType<typeof Drawer>>();
</script>

<template>
  <h1>计划</h1>
  <el-button @click="drawer?.open(null)">添加计划</el-button>

  <ListItem v-for="todo in todoStore.todos" :key="todo.id">
    <template #header><el-checkbox v-model="todo.completion"/></template>
    {{ todo.title }}
    <template #footer>
      <el-button type="primary" :icon="Edit" size="small" circle @click="drawer?.open(todo)" />
      <el-button type="danger" :icon="Delete" size="small" circle @click="todoStore.del(todo.id)" />
    </template>
  </ListItem>

  <Drawer ref="drawer" />
</template>
