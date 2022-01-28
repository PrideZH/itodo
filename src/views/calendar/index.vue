<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTodoStore } from '@/store';
import { Todo } from '@/types/global';
import { dateFormat } from '@/utils/dateUtil';

const todoStore = useTodoStore();
const todoMap = ref<Map<String, Array<Todo>>>(new Map());
const value = ref(new Date());

onMounted(() => {
  todoStore.todos.forEach(todo => {
    if (todo.deadline) {
      const key: string = dateFormat(new Date(todo.deadline), 'yyyy-MM-dd');
      const todoMapItem: Array<Todo> | undefined = todoMap.value.get(key);
      if (todoMapItem === undefined) {
        todoMap.value.set(key, [todo]);
      } else {
        todoMapItem.push(todo);
      }
    }
  });
  console.log(todoMap.value)
});
</script>

<template>
  <el-calendar v-model="value">
    <template #dateCell="{ data }">
      {{ data.date.getDate() }}
      <div v-if="todoMap.get(data.day)" v-for="todo in todoMap.get(data.day)" :key="todo.id">
        <el-tag size="small">{{ todo.title }}</el-tag>
      </div>
    </template>
  </el-calendar>
</template>
