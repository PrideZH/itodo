<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTodoStore } from '../../../store';
import { ElMessage } from 'element-plus';
import { Todo } from 'src/renderer/src/types/global';

const todoStore = useTodoStore();
const todos = computed(() => todoStore.getTodos);

const todoDefault: Todo = {
  id: 0,
  content: '',
  group: '',
  completion: false
};

const visible = ref<boolean>(false);
const form = ref<Todo>({...todoDefault});

let model: 'create' | 'update' = 'create';

const open = (todo: Todo | null) => {
  if (todo !== null) {
    model = 'update';
    form.value = { ...todo };
  } else if (form.value.id !== 0) {
    form.value = { ...todoDefault };
  }
  visible.value = true;
};
defineExpose({ open });

const handleConfirm = () => {
  if (form.value.content?.trim() === '') {
    ElMessage.warning("标题不能为空"); return;
  }
  const todo: Todo = { ...form.value };
  if (model === 'create') {
    todo.id = new Date().getTime();
    todoStore.add(todo);
    form.value = { ...todoDefault };
  } else {
    todoStore.set(todo);
  }
  visible.value = false;
};

const groups = (queryString: string, cb: any) => {
  const res: {value: string}[] = [];
  todos.value.forEach(todo => {
    if (todo.group !== '' && todo.group !== undefined && res.indexOf({value:todo.group}) === -1) {
      res.push({value: todo.group});
    }
  });
  console.log(res)
  cb(res);
}
</script>

<template>
  <el-drawer v-model="visible" :title="model === 'create' ? '添加计划' : '修改计划'">
    <el-form>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="分组">
        <el-autocomplete placeholder="默认" :fetch-suggestions="groups" v-model="form.group" />
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
