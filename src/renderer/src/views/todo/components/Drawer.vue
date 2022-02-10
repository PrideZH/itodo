<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../../../store';
import { ElMessage } from 'element-plus';
import { Step, Todo, TodoOption } from '../../../types/global';
import { Close } from '@element-plus/icons-vue';

const todoStore = useTodoStore();

const createTodoDefault = (): Todo => ({
  id: 0,
  content: '',
  steps: [],
  star: false,
  group: '',
  imageUrl: [],
  completion: false,
  completionTime: null
});

const visible = ref<boolean>(false);
const form = ref<Todo>(createTodoDefault());
const formRef = ref();

const model = ref<'create' | 'update'>('create');

const open = (todo: Todo | null, option?: TodoOption) => {
  if (todo !== null) {
    model.value = 'update';
    form.value = JSON.parse(JSON.stringify(todo));
  } else {
    model.value = 'create';
    // 上一次为编辑时时重置数据 为添加时保留数据
    if (form.value.id !== 0) {
      form.value = createTodoDefault();
    }
    if (option !== undefined) {
      if (option.group) form.value.group = option.group;
    }
  }
  visible.value = true;
};
defineExpose({ open });

const pasteEvent = (e: any) => {
  if (!(e.clipboardData && e.clipboardData.items)) return;
  for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
    const item = e.clipboardData.items[0];
    if (item.kind === "file" && item.type.match(/^image\//i)) {
      const f = item.getAsFile();
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = function(ev) {
        if (ev.target === null) return;
        const dataURL = ev.target.result;
        console.log('puhs')
        form.value.imageUrl.push(dataURL as string);
      }
    }
  }
}

const opened = () => {
  document.getElementsByClassName('content-input')[0].addEventListener('paste', pasteEvent);
}

const closed = () => {
  document.getElementsByClassName('content-input')[0].removeEventListener('paste', pasteEvent)
}

const handleConfirm = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid: boolean | undefined) => {
    if (valid) {
      const todo: Todo = { ...form.value };
      if (model.value === 'create') {
        todo.id = new Date().getTime();
        todoStore.add(todo);
        form.value = createTodoDefault();
        ElMessage.success({message: '添加成功', offset: 80});
      } else {
        todoStore.set(todo);
      }
      visible.value = false;
    }
  });
};

const groups = (queryString: string, cb: any) => {
  const res: string[] = [];
  todoStore.todos.forEach(todo => {
    if (todo.group !== ''
        && todo.group !== null
        && todo.group.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        && res.indexOf(todo.group) === -1) {
      res.push(todo.group);
    }
  });
  cb(res.map(item => ({value: item})));
}

const addStep = () => {
  form.value.steps.push({
    id: Date.now(),
    content: '',
    completion: false
  })
}

const removeStep = (step: Step) => {
  const index = form.value.steps.indexOf(step)
  if (index !== -1) {
    form.value.steps.splice(index, 1);
  }
}
</script>

<template>
  <el-drawer v-model="visible" :title="model === 'create' ? '添加计划' : '修改计划'" @opened="opened" @closed="closed">
    <el-form ref="formRef" :model="form">
      <el-form-item prop="content" label="内容" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
        <el-input placeholder="可粘贴图片..." class="content-input" v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item
        v-for="(step, index) in form.steps" :key="step.id"
        label="步骤"
        :prop="'steps.' + index + '.content'"
        :rules="{ required: true, message: '不能为空', trigger: 'blur' }"
      >
        <el-space>
          <el-input v-model="step.content" type="textarea" />
          <el-button type="text" @click.prevent="removeStep(step)">删除</el-button>
        </el-space>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click.prevent="addStep()">+ 添加步骤</el-button>
      </el-form-item>
      <el-form-item label="分组">
        <el-autocomplete placeholder="默认" :fetch-suggestions="groups" v-model="form.group" />
      </el-form-item>
    </el-form>
    <span class="img-item" v-for="(url, index) in form.imageUrl">
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
        :preview-src-list="form.imageUrl"
        fit="cover"
      />
      <el-button class="img-close" :icon="Close" size="small" circle @click="form.imageUrl.splice(index, 1)" />
    </span>
    <template #footer>
      <el-button type="primary" @click="handleConfirm">{{ model === 'create' ? '添加' : '修改' }}</el-button>
    </template>
  </el-drawer>
</template>

<style scoped>
.img-item {
  position: relative;
}

.img-item .img-close {
  position: absolute;
  right: 0;
  border: none;
}
</style>
