<script setup lang="ts">
import Drawer from './components/Drawer.vue';
import TodoList from './components/TodoList.vue';
import { computed, ref } from 'vue';
import { Todo } from '../../types/global';
import { Search } from '@element-plus/icons-vue';
import { useTodoStore } from '../../store';

const todoStore = useTodoStore();

const drawer = ref<InstanceType<typeof Drawer>>();

const active = ['do'];

const searchContent = ref<string>('');
const groupSelect = ref<string>('全部');

const dataList = computed(() => todoStore.getTodos.filter((item: Todo) => {
  let flag: boolean = item.content.indexOf(searchContent.value) !== -1;
  if (groupSelect.value === '全部') {
  } else if (groupSelect.value === '未分组') {
    flag = flag && (item.group === '' || item.group === null);
  } else {
    flag = flag && item.group === groupSelect.value;
  }
  return flag;
}));
const doList = computed(() => dataList.value.filter((item: Todo) => !item.completion));
const doneList = computed(() => dataList.value.filter((item: Todo) => item.completion));
const groups = computed(() => {
  const res: string[] = ['全部', '未分组'];
  todoStore.getTodos.forEach(todo => {
    if (todo.group !== '' && todo.group !== null && res.indexOf(todo.group) === -1) {
      res.push(todo.group);
    }
  });
  return res;
});

const onEdit = (todo: Todo) => drawer.value?.open(todo);
</script>

<template>
  <el-space>
    <el-button type="primary" @click="drawer?.open(null)">添加计划</el-button>
    <el-button type="danger" @click="todoStore.clearDone()">清空已完成</el-button>
    <el-input placeholder="搜索" :suffix-icon="Search" v-model="searchContent" />
    <el-select v-model="groupSelect">
      <el-option v-for="group in groups" :key="group" :label="group" :value="group" />
    </el-select>
  </el-space>

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
  background-color: var(--bgColor);
}

.main >>> .el-collapse-item__header {
  border-bottom: 1px solid #7993a2;
}

.main >>> .el-collapse-item__wrap {
  border-bottom: none;
}

.title {
  color: var(--textColor);
  font-size: 24px;
  font-weight: 700;
}

.main >>> .el-collapse-item__header:hover .title {
  color: #4e606c;
}
</style>
