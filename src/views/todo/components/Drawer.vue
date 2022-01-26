<script setup lang="ts">
import { Todo } from '@/types/global';
import { reactive, ref } from 'vue';
import { useTodoStore } from '@/store';
import type { ElForm } from 'element-plus'

const todoStore = useTodoStore();

const todoDefault: Todo = {
  id: 0,
  content: '',
  color: 'default',
  remind: false,
  remindTimeAgo: 0,
  deadline: null,
  repeat: false,
  repeatTime: 15,
  completion: false,
  remark: '',
};

const visible = ref<boolean>(false);
const todoForm = ref<Todo>(todoDefault);

let model: 'create' | 'update' = 'create';

const fromRef = ref<InstanceType<typeof ElForm>>();

// 暴露方法
const open = (todo: Todo | null): void => {
  if (todo !== null) {
    model = 'update';
    todoForm.value = { ...todo };
  } else {
    todoForm.value = { ...todoDefault };
  }
  if (fromRef.value) fromRef.value.resetFields();
  visible.value = true;
};
defineExpose({ open });

const rules = reactive({
  content: [
    {
      required: true,
      message: '内容不能为空',
      trigger: 'blur',
    }
  ]
});

const handleConfirm = (): void => {
  if (!fromRef.value) return;
  fromRef.value.validate((isValid?: boolean) => {
    if (isValid) {
       if (model === 'create') {
        const todo: Todo = { ...todoForm.value };
        todo.id = new Date().getTime();
        todoStore.add(todo);
      } else {
        todoStore.set(todoForm.value);
      }
      visible.value = false;
    }
  });
};
</script>

<template>
  <el-drawer v-model="visible" :title="model === 'create' ? '添加计划' : '修改计划'">
    <el-form ref="fromRef" :model="todoForm" :rules="rules">
      <el-form-item label="内容" prop="content">
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
        <el-input-number v-model="todoForm.remindTimeAgo" :min="0" controls-position="right" />
      </el-form-item>
      <el-form-item label="重复">
        <el-switch v-model="todoForm.repeat" />
      </el-form-item>
      <el-form-item v-if="todoForm.repeat" label="重复时间">
        <el-input-number v-model="todoForm.repeatTime" :min="1" controls-position="right" />
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
