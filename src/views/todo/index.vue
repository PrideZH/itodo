<script setup lang="ts">
import { Todo } from '@/types/global';
import { ref } from 'vue';
import { useTodoStore } from '@/store';

const todoStore = useTodoStore();

const createTodoVisible = ref<boolean>(false);
const createTodoForm = ref<Todo>({
  id: 0,
  title: '',
  content: '',
  color: 'default',
  remindTime: null,
  deadline: null,
  repeat: false,
  repeatTime: null,
  completion: false,
  remark: '',
});
const handleCreateTodo = (): void => {
  const todo: Todo = {...createTodoForm.value };
  todo.id = new Date().getTime();
  todoStore.add(todo);
  createTodoVisible.value = false;
};
</script>

<template>
  <h1>今天计划</h1>
  <el-button @click="createTodoVisible = true">添加计划</el-button>
  <el-button>清空已完成</el-button>
  <div v-for="todo in todoStore.todos" :key="todo.id">
    {{ todo.title }}
    {{ todo.content }}
  </div>

  <el-drawer v-model="createTodoVisible" title="添加计划">
    <el-form :model="createTodoForm">
      <el-form-item label="标题">
        <el-input v-model="createTodoForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="createTodoForm.content"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="createTodoVisible = false">取消</el-button>
      <!-- <el-button type="primary" :loading="loading" @click="onClick">{{
        loading ? 'Submitting ...' : 'Submit'
      }}</el-button> -->
      <el-button type="primary" @click="handleCreateTodo">确定</el-button>
    </template>
  </el-drawer>
</template>

<style>
</style>
