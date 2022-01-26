<script setup lang="ts">
import { Todo } from '@/types/global';
import { ref } from 'vue';
import { useTodoStore } from '@/store';

const todoStore = useTodoStore();

const todoDefault: Todo = {
  id: 0,
  content: '',
  color: 'default',
  remind: false,
  remindTime: null,
  deadline: null,
  repeat: false,
  repeatTime: null,
  completion: false,
  remark: '',
};

const visible = ref<boolean>(false);
const todoForm = ref<Todo>(todoDefault);

let model: 'create' | 'update' = 'create';

// 暴露方法
const open = (todo: Todo | undefined): void => {
  if (todo !== undefined) {
    model = 'update';
    todoForm.value = { ...todo };
  } else {
    todoForm.value = { ...todoDefault };
  }
  visible.value = true;
};
defineExpose({ open });

const handleConfirm = (): void => {
  if (model === 'create') {
    const todo: Todo = { ...todoForm.value };
    todo.id = new Date().getTime();
    todoStore.add(todo);
  } else {
    todoStore.set(todoForm.value);
  }
  visible.value = false;
};
</script>

<template>
  <el-drawer v-model="visible" :title="model === 'create' ? '添加计划' : '修改计划'">
    <el-form :model="todoForm">
      <el-form-item label="内容">
        <el-input v-model="todoForm.content"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker
          v-model="todoForm.deadline"
          type="datetime"
        />
      </el-form-item>
      <el-form-item label="提醒">
        <el-switch v-model="todoForm.remind" />
      </el-form-item>
      <el-form-item v-if="todoForm.remind" label="提前提醒时间">
        <el-date-picker
          v-model="todoForm.remindTime"
          type="datetime"
        />
      </el-form-item>
      <el-form-item label="重复">
        <el-switch v-model="todoForm.repeat" />
      </el-form-item>
      <el-form-item v-if="todoForm.repeat" label="重复时间">
        <el-date-picker
          v-model="todoForm.repeatTime"
          type="datetime"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="todoForm.remark" type="textarea" />
      </el-form-item>
    </el-form>


    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <!-- <el-button type="primary" :loading="loading" @click="onClick">{{
        loading ? 'Submitting ...' : 'Submit'
      }}</el-button> -->
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-drawer>
</template>
