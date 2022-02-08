<script setup lang="ts">
import ListItem from '../../../components/ListItem.vue';
import { useTodoStore } from '../../../store';
import { Todo } from '../../../types/global';
import { computed } from 'vue';
import { Clock, Delete, Edit } from '@element-plus/icons-vue';
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
</script>

<template>
  <ListItem v-for="todo in todos" :key="todo.id">
    <template #header>
      <el-checkbox v-model="todo.completion" @change="onChange(todo)"/>
    </template>
    <span :class="{'content-completion': todo.completion}">
      <div>
        <span v-if="todo.group !== '' && todo.group !== null">【{{ todo.group }}】</span>
        <span>{{ todo.content }}</span>
      </div>
      <el-image
        class="img"
        v-for="url in todo.imageUrl"
        :src="url"
        :preview-src-list="todo.imageUrl"
        fit="cover"
      />
    </span>
    <div>
      <span v-if="todo.completionTime" class="todo-time">
        <el-icon><Clock /></el-icon>
        {{ dateFormat(todo.completionTime, 'yyyy-MM-dd hh:mm:ss') }}
      </span>
    </div>
    <template #footer>
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
.content-completion {
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

.todo-time {
  display: flex;
  align-items: center;
  color: #999;
}
</style>
