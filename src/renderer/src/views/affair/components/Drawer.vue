<script setup lang="ts">
import { ref } from 'vue';
import { useAffairStore } from '../../../store';
import { ElMessage } from 'element-plus';
import { Affair } from 'src/renderer/src/types/global';

const affairStore = useAffairStore();

const affairDefault: Affair = {
  content: ''
};

const visible = ref<boolean>(false);
const form = ref<Affair>(affairDefault);

let model: 'create' | 'update' = 'create';

const open = (affair: Affair | null): void => {
  if (affair !== null) {
    model = 'update';
    form.value = { ...affair };
  } else {
    form.value = { ...affairDefault };
  }
  visible.value = true;
};
defineExpose({ open });

const handleConfirm = (): void => {
  if (form.value.content?.trim() === '') {
    ElMessage.warning("标题不能为空"); return;
  }

  const affair: Affair = { ...form.value };
  if (model === 'create') {
    affair.id = new Date().getTime();
    affairStore.add(affair);
  } else {
    affairStore.set(affair);
  }
  visible.value = false;
};
</script>

<template>
  <el-drawer v-model="visible" :title="model === 'create' ? '添加事情' : '修改事情'">
    <el-form>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.dateTime"
          type="datetimerange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="提醒时间">
        <el-date-picker v-model="form.remindTime" type="datetime" />
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
