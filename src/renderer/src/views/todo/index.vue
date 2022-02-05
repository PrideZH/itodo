<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useTodoStore } from '../../store';
import Drawer from './components/Drawer.vue';
import ListItem from '../../components/ListItem.vue';

const todoStore = useTodoStore();

const drawer = ref<InstanceType<typeof Drawer>>();
</script>

<template>
  <el-button @click="drawer?.open(null)">添加计划</el-button>

  <ListItem v-for="todo in todoStore.todos" :key="todo.id">
    <template #header>
      <el-checkbox v-model="todo.completion" @change="todoStore.set(todo)"/>
    </template>
    <span :class="{'content-completion': todo.completion}">{{ todo.content }}</span>
    <template #footer>
      <el-button type="primary" :icon="Edit" size="small" circle @click="drawer?.open(todo)" />
      <el-button type="danger" :icon="Delete" size="small" circle @click="todoStore.del(todo.id)" />
    </template>
  </ListItem>

  <Drawer ref="drawer" />
</template>

<style scoped>
.content-completion {
  color: #999999;
  text-decoration: line-through;
}
</style>
