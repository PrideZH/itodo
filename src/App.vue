<script setup lang="ts">
import { useTodoStore } from '@/store';

const todoStore = useTodoStore();

// 加载数据
todoStore.load();
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
