<script setup lang="ts">
import { AlarmClock, Calendar, Files, List, Setting } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useAffairStore, useMemoStore, useTaskStore, useTodoStore } from '../store';
import { Task, Todo } from '../types/global';

const todoStore = useTodoStore();
const memoStore = useMemoStore();
const affairStore = useAffairStore();
const taksStore = useTaskStore();

const doTodoList = computed(() => todoStore.todos.filter((item: Todo) => !item.completion));
const doTaskList = computed(() => taksStore.tasks.filter((item: Task) => item.enable));
</script>

<template>
  <el-container class="container">
    <el-aside class="aside" width="180px">
      <!-- <div class="introduce">
        <el-avatar>
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        Nickname
        Username
      </div> -->
      <el-menu class="menu" default-active="/todo" router>
        <el-menu-item index="/todo">
          <el-icon class="icon"><List /></el-icon>
          <span style="flex: 1;">待办</span>
          <span class="count" v-if="doTodoList.length !== 0">{{ doTodoList.length }}</span>
        </el-menu-item>
        <el-menu-item index="/memo">
          <el-icon class="icon"><Files /></el-icon>
          <span style="flex: 1;">备忘</span>
          <span class="count" v-if="memoStore.memos.length !== 0">{{ memoStore.memos.length }}</span>
        </el-menu-item>
        <el-menu-item index="/affair">
          <el-icon class="icon"><Calendar /></el-icon>
          <span style="flex: 1;">日历</span>
          <span class="count" v-if="affairStore.affairs.length !== 0">{{ affairStore.affairs.length }}</span>
        </el-menu-item>
        <el-menu-item index="/task">
          <el-icon class="icon"><AlarmClock /></el-icon>
          <span style="flex: 1;">任务</span>
          <span class="count" v-if="doTaskList.length !== 0">{{ doTaskList.length }}</span>
        </el-menu-item>
      </el-menu>
      <div class="tool-box">
        <el-button type="text" :icon="Setting">设置</el-button>
      </div>
    </el-aside>
    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.container {
  height: 100%;
}

.aside {
  display: flex;
  flex-direction: column;
}

.introduce {
  margin: 8px 16px;
}

.search {
  margin: 0 16px 16px;
}

.menu {
  flex: 1;
  height: 100%;
  border-right: none;
}

.menu >>> .el-menu-item {
  height: 40px;
  margin: 8px 16px;
  border-radius: 12px;
}

.menu >>> .is-active {
  color: #fff;
  background-color: #409eff;
}

.icon {
  color: #409eff;
}

.menu >>> .is-active .icon {
  color: #fff;
}

.count {
  padding: 6px;
  height: 8px;
  border-radius: 12px;
  line-height: 8px;
  color: #409eff;
  background-color: #fff;
}

.main {
  padding: 32px;
  margin: 0;
  border-radius: 8px;
  background-color: var(--bgColor);
}

.tool-box {
  padding: 8px 16px;
}
</style>
