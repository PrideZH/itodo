<script setup lang="ts">
import { Todo, todoDefault } from '../../../types/global';
import { ref } from 'vue';
import { useTodoStore } from '../../../store';
import { ElMessage } from 'element-plus';

const todoStore = useTodoStore();

const visible = ref<boolean>(false);
const todoForm = ref<Todo>(todoDefault);

let model: 'create' | 'update' = 'create';

// 暴露方法
const open = (todo: Todo | null): void => {
  if (todo !== null) {
    model = 'update';
    todoForm.value = { ...todo };
  } else {
    todoForm.value = { ...todoDefault };
  }
  visible.value = true;
};
defineExpose({ open });

const handleConfirm = (): void => {
  if (todoForm.value.title?.trim() === '') {
    ElMessage.warning("标题不能为空"); return;
  }
  if (todoForm.value.model === 'frame') {
    if (todoForm.value.startTime === undefined) {
      ElMessage.warning("开始时间不能为空"); return;
    }
  } else if (todoForm.value.model === 'daily') {
    if (todoForm.value.date === undefined) {
      ElMessage.warning("日期不能为空"); return;
    }
  } else if (todoForm.value.model === 'remind') {
    if (todoForm.value.startTime === undefined) {
      ElMessage.warning("提醒不能为空"); return;
    }
  }

  if (model === 'create') {
    const todo: Todo = { ...todoForm.value };
    todo.id = new Date().getTime();
    todoStore.add(todo);
  } else {
    const todo: Todo = { ...todoForm.value };
    todoStore.set(todo);
  }
  visible.value = false;
};
</script>

<template>
  <el-drawer v-model="visible" :title="model === 'create' ? '添加计划' : '修改计划'">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="todoForm.title"></el-input>
      </el-form-item>
      <el-form-item label="模式">
        <el-radio-group v-model="todoForm.model">
          <el-radio label="default">默认</el-radio>
          <el-radio label="frame">期限</el-radio>
          <el-radio label="daily">整天</el-radio>
          <el-radio label="remind">提醒</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="todoForm.model === 'frame'">
        <el-form-item label="开始时间">
          <el-date-picker v-model="todoForm.startTime" type="datetime" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="todoForm.endTime" type="datetime" />
        </el-form-item>
        <el-form-item label="提醒">
          <el-select v-model="todoForm.remindTime">
            <el-option label="不提醒" :value="0" />
            <el-option label="提前1分钟" :value="1" />
            <el-option label="提前5分钟" :value="2" />
            <el-option label="提前15分钟" :value="3" />
            <el-option label="提前半小时" :value="4" />
            <el-option label="提前一小时" :value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="重复">
          <el-select v-model="todoForm.repeat">
            <el-option label="不重复" :value="0" />
            <el-option label="每天" :value="1" />
            <el-option label="工作日" :value="2" />
            <el-option label="每周" :value="3" />
            <el-option label="每月" :value="4" />
            <el-option label="每年" :value="5" />
          </el-select>
        </el-form-item>
      </template>
      <template v-if="todoForm.model === 'daily'">
        <el-form-item label="日期">
          <el-date-picker type="date" v-model="todoForm.date" />
        </el-form-item>
        <el-form-item label="重复">
          <el-select v-model="todoForm.repeat">
            <el-option label="不重复" :value="0" />
            <el-option label="每天" :value="1" />
            <el-option label="工作日" :value="2" />
            <el-option label="每周" :value="3" />
            <el-option label="每月" :value="4" />
            <el-option label="每年" :value="5" />
          </el-select>
        </el-form-item>
      </template>
      <template v-if="todoForm.model === 'remind'">
        <el-form-item label="提醒时间">
          <el-date-picker v-model="todoForm.startTime" type="datetime" />
        </el-form-item>
        <el-form-item label="重复间隔">
          <el-input-number :min="0" v-model="todoForm.repeatTime" />
        </el-form-item>
        <el-form-item label="间隔单位">
          <el-select v-model="todoForm.repeatUnit">
            <el-option label="不重复" :value="0" />
            <el-option label="秒" :value="1" />
            <el-option label="分" :value="2" />
            <el-option label="时" :value="3" />
            <el-option label="月" :value="4" />
            <el-option label="年" :value="5" />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="备注">
        <el-input v-model="todoForm.content" type="textarea" />
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
