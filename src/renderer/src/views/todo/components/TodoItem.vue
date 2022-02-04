<script setup lang="ts">
import { computed, ref } from 'vue';
import Drawer from './Drawer.vue';
import { useTodoStore } from '../../../store';

const todoStore = useTodoStore();

defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const drawer = ref<InstanceType<typeof Drawer>>();

const isTimeout = computed(() => {
  return (date: Date): boolean => {
    date = new Date(date);
    return new Date().getTime() > date.getTime();
  }
});

</script>

<template>
  <el-card :body-style="{padding: '12px 20px'}">
    <div class="todo-item">

      <div class="todo-body">
        <div :class="{'todo-content': true, 'todo-content-finish': todo.completion}">{{ todo.title }}</div>
        <div class="todo-folder">

          <el-icon v-if="todo.remindTime !== 0" style="margin-left: 8px;"><alarm-clock /></el-icon>
          <el-icon v-if="todo.repeat" style="margin-left: 8px;"><refresh /></el-icon>
          <el-popover trigger="hover" placement="bottom-start">
            <template #reference>
              <el-icon v-if="todo.content && todo.content.trim() !== ''" style="margin-left: 8px;">
                <document />
              </el-icon>
            </template>
            {{ todo.content }}
          </el-popover>
        </div>
      </div>

    </div>
  </el-card >
</template>

<style scoped>
.todo-content-finish {
  text-decoration: line-through;
}

.todo-folder {
  display: flex;
}

.todo-time-timeout {
  color: #f56c6c;
}
</style>
