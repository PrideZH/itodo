<script setup lang="ts">
import ListItem from '../../../components/ListItem.vue';
import { useTodoStore } from '../../../store';
import { Todo } from '../../../types/global';
import { computed } from 'vue';
import { Clock, Delete, Edit, Star } from '@element-plus/icons-vue';
import { dateFormat } from '../../../utils/dateUtil';

const todoStore = useTodoStore();

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});
const todos = computed(() => props.data as Todo[]);

const emits = defineEmits(['onEdit']);

const onChange = (todo: Todo) => {
  todo.completionTime = todo.completion ? new Date() : null;
  todoStore.set(todo);
}

const onClickStar = (todo: Todo) => {
  todo.star = !todo.star;
  todoStore.set(todo);
};

const content = computed(() => {
  return (content: string) => {
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    content = content.replace(new RegExp(/</g), '&lt;');
    content = content.replace(new RegExp(/>/g), '&gt;');
    content = content.replace(new RegExp(/ /g), '&nbsp;');
    content = content.replaceAll(/\n/g,'<br/>');
    return content.replace(reg, '<a href="javascript:void(0)" onclick=window.shell.openExternal("$1$2")>$1$2</a>');
  };
});
</script>

<template>
  <ListItem v-for="todo in todos" :key="todo.id">
    <template #header>
      <el-checkbox v-model="todo.completion" @change="onChange(todo)"/>
    </template>
    <div :class="{'completion-text': todo.completion}">
      <div class="content" v-html="content(todo.content)" />
      <div v-for="step in todo.steps">
        <el-checkbox v-model="step.completion" @change="onChange(todo)"/>
        <span :class="{'completion-text': step.completion}" v-html="content(step.content)" />
      </div>
      <div>
        <el-image
          class="img"
          v-for="url in todo.imageUrl"
          :src="url"
          :preview-src-list="todo.imageUrl"
          fit="cover"
        />
      </div>
    </div>
    <el-space>
      <span v-if="todo.group !== '' && todo.group !== null" class="todo-group">
        {{ todo.group }}
      </span>
      <span v-if="todo.completionTime" class="todo-time">
        <el-icon><Clock /></el-icon>
        {{ dateFormat(todo.completionTime, 'yyyy-MM-dd hh:mm:ss') }}
      </span>
    </el-space>
    <template #footer>
      <el-button :type="todo.star ? 'warning' : ''" :icon="Star" size="small" circle @click="onClickStar(todo)" />
      <el-button type="primary" :icon="Edit" size="small" circle @click="emits('onEdit', todo)" />
      <el-popconfirm title="是否删除？" @confirm="todoStore.del(todo.id)">
        <template #reference>
          <el-button type="danger" :icon="Delete" size="small" circle />
        </template>
      </el-popconfirm>
    </template>
  </ListItem>
</template>

<style scoped>
.content {
  font-size: 16px;
}

.content >>> a {
  text-decoration: none;
  font-size: 12px;
}

.completion-text {
  color: #999999;
  text-decoration: line-through;
}

.img {
  width: 64px;
  height: 64px;
  margin-right: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.todo-group {
  padding: 0 8px;
  color: #eee;
  background-color: #409eff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
}

.todo-time {
  display: flex;
  align-items: center;
  color: #999;
}
</style>
