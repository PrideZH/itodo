<script setup lang="ts">
import { Todo } from '../../types/global';
import { onMounted, Ref, ref } from 'vue';
import { useTodoStore } from '../../store';
import { MINUTES, SECONDS } from '../../utils/dateUtil';
import { notice } from '../../utils/countDownUtil';

const todoStore = useTodoStore();

const recentlyTodo = ref<Todo>();
const recentlyTodoTimes = ref<number>();

onMounted(() => {
  launchTimer();
});

const launchTimer = () => {
  recentlyTodo.value = undefined;
  recentlyTodoTimes.value = undefined;

  todoStore.todos.forEach((todo: Todo) => {
    if (todo.deadline && todo.remind) {
      const remindTime: number = new Date(todo.deadline).getTime() - todo.remindTimeAgo * MINUTES;
      if (remindTime < new Date().getTime()) return;
      if (recentlyTodo.value && recentlyTodo.value.deadline
          && remindTime > recentlyTodo.value.deadline.getTime() - recentlyTodo.value.remindTimeAgo * MINUTES) {
        recentlyTodo.value = todo;
      } else {
        recentlyTodo.value = todo;
      }
    }
  });

  // 倒计时
  if (recentlyTodo.value ) recentlyTodo.value = recentlyTodo.value as Todo;
  if (recentlyTodo.value && recentlyTodo.value.deadline) {
    recentlyTodoTimes.value = Math.floor((
        new Date(recentlyTodo.value.deadline).getTime() - recentlyTodo.value.remindTimeAgo * MINUTES
        - new Date().getTime()) / SECONDS);
    const timer = setInterval(() => {
      if (recentlyTodoTimes.value === 0 || recentlyTodoTimes.value === undefined) {
        if (recentlyTodo.value) notice(recentlyTodo.value.title, recentlyTodo.value.content);
        clearInterval(timer)
        launchTimer();
        return;
      }
      recentlyTodoTimes.value--;
    }, 1000)
  }
};
</script>

<template>
  <h1>今天计划</h1>
  <el-card>
    <template #header>最近提醒</template>
    {{ recentlyTodo?.title }}
    {{ recentlyTodoTimes }}
  </el-card>
  <h1>重要计划</h1>
</template>

<style>
</style>
