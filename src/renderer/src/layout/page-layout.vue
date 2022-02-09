<script setup lang="ts">
import { AlarmClock, Calendar, List } from '@element-plus/icons-vue';
import { useAffairStore, useTaskStore, useTodoStore } from '../store';

const todoStore = useTodoStore();
const affairStore = useAffairStore();
const taksStore = useTaskStore();
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
          <span class="count" v-if="todoStore.todos.length !== 0">{{ todoStore.todos.length }}</span>
        </el-menu-item>
        <el-menu-item index="/affair">
          <el-icon class="icon"><Calendar /></el-icon>
          <span style="flex: 1;">事情</span>
          <span class="count" v-if="affairStore.affairs.length !== 0">{{ affairStore.affairs.length }}</span>
        </el-menu-item>
        <el-menu-item index="/task">
          <el-icon class="icon"><AlarmClock /></el-icon>
          <span style="flex: 1;">任务</span>
          <span class="count" v-if="taksStore.tasks.length !== 0">{{ taksStore.tasks.length }}</span>
        </el-menu-item>
      </el-menu>
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
</style>
