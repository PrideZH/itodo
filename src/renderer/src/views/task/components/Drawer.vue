<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../../../store';
import { ElMessage } from 'element-plus';
import { Task } from 'src/renderer/src/types/global';

const taskStore = useTaskStore();

const taskDefault: Task = {
  id: 0,
  content: '',
  dateTime: new Date(),
  repeat: 0,
  enable: true
};

const visible = ref<boolean>(false);
const form = ref<Task>(taskDefault);

let model: 'create' | 'update' = 'create';

const open = (task: Task | null): void => {
  if (task !== null) {
    model = 'update';
    form.value = { ...task };
  } else {
    form.value = { ...taskDefault };
  }
  visible.value = true;
};
defineExpose({ open });

const handleConfirm = (): void => {
  if (form.value.content?.trim() === '') {
    ElMessage.warning("标题不能为空"); return;
  }
  if (form.value.dateTime === undefined) {
    ElMessage.warning("时间不能为空"); return;
  }

  const task: Task = { ...form.value };
  if (model === 'create') {
    task.id = new Date().getTime();
    taskStore.add(task);
  } else {
    taskStore.set(task);
  }
  visible.value = false;
};
</script>

<template>
  <el-drawer v-model="visible" :title="model === 'create' ? '添加计划' : '修改计划'">
    <el-form>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="提醒时间">
        <el-date-picker v-model="form.dateTime" type="datetime" />
      </el-form-item>
      <el-form-item label="重复间隔">
        <el-input-number :min="0" v-model="form.repeat" />
      </el-form-item>
      <el-form-item label="事件">
        <el-checkbox label="弹窗提醒" />
        <el-checkbox label="播放声音" />
        <el-checkbox label="打开网页" />
        <el-checkbox label="打开文件" />
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
