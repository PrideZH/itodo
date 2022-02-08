<script setup lang="ts">
import { computed, ref } from 'vue';
import Drawer from './components/Drawer.vue';
import { Todo } from '../../types/global';
import { useTodoStore } from '../../store';
import TodoList from './components/TodoList.vue';

const todoStore = useTodoStore();

const drawer = ref<InstanceType<typeof Drawer>>();

const active = ['do'];

const doList = computed(() => todoStore.getTodos.filter((item: Todo) => !item.completion));
const doneList = computed(() => todoStore.getTodos.filter((item: Todo) => item.completion));

const onEdit = (todo: Todo) => drawer.value?.open(todo);
</script>

<template>
  <el-button type="primary" @click="drawer?.open(null)">添加计划</el-button>
  <el-button type="danger" @click="todoStore.clearDone()">清空已完成</el-button>

  <el-collapse class="main" v-model="active">
    <el-collapse-item class="collapse-item" name="do">
      <template #title>
        <span class="title">在进行 ({{ doList.length }})</span>
      </template>
      <TodoList :data="doList" @on-edit="onEdit" />
    </el-collapse-item>
    <!-- <el-collapse-item class="collapse-item" name="todo">
      <template #title>
        <span class="title">未开始 ({{ doList.length }})</span>
      </template>
    </el-collapse-item> -->
    <el-collapse-item class="collapse-item" name="done">
      <template #title>
        <span class="title">已完成 ({{ doneList.length }})</span>
      </template>
      <TodoList :data="doneList" @on-edit="onEdit" />
    </el-collapse-item>
  </el-collapse>

  <Drawer ref="drawer" />
</template>

<style scoped>
.main {
  margin-top: 16px;
}

.main > .el-collapse {
  border-top: none;
}

.main >>> .el-collapse-item__header, .main >>> .el-collapse-item__wrap {
  background-color: #cde2e9;
}

.main >>> .el-collapse-item__header {
  border-bottom: 1px solid #7993a2;
}

.main >>> .el-collapse-item__wrap {
  border-bottom: none;
}

.title {
  color: #29262e;
  font-size: 24px;
  font-weight: 700;
}

.main >>> .el-collapse-item__header:hover .title {
  color: #4e606c;
}
</style>
