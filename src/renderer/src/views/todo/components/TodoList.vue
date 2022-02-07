<script setup lang="ts">
import ListItem from '../../../components/ListItem.vue';
import { useTodoStore } from '../../../store';
import { Todo } from '../../../types/global';
import { computed } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue';

const todoStore = useTodoStore();

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});
const todos = computed(() => props.data as Todo[]);

const emits = defineEmits(['onEdit']);
</script>

<template>
  <ListItem v-for="todo in todos" :key="todo.id">
    <template #header>
      <el-checkbox v-model="todo.completion" @change="todoStore.set(todo)"/>
    </template>
    <span :class="{'content-completion': todo.completion}">
      <span v-if="todo.group !== '' && todo.group !== undefined">【{{ todo.group }}】</span>
      {{ todo.content }}
    </span>
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
