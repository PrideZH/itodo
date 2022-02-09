<script setup lang="ts">
import Drawer from './components/Drawer.vue';
import ListItem from '../../components/ListItem.vue';
import { Calendar, Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { dateFormat } from '../../utils/dateUtil';
import { useAffairStore } from '../../store';

const drawer = ref<InstanceType<typeof Drawer>>();

const affairStore = useAffairStore();
</script>

<template>
  <el-button type="primary" @click="drawer?.open(null)">添加事件</el-button>

  <ListItem v-for="affair in affairStore.affairs" :key="affair.id">
    <div>{{ affair.content }}</div>
    <div class="time" v-if="affair.dateTime">
      <el-icon><Calendar /></el-icon>
      {{ dateFormat(affair.dateTime[0], 'yyyy-MM-dd hh:mm') }} - {{ dateFormat(affair.dateTime[1], 'yyyy-MM-dd hh:mm')}}
    </div>
    <template #footer>
      <el-button type="primary" :icon="Edit" size="small" circle @click="drawer?.open(affair)" />
      <el-button type="danger" :icon="Delete" size="small" circle @click="affairStore.del(affair.id)" />
    </template>
  </ListItem>

  <Drawer ref="drawer" />
</template>

<style scoped>
.time {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #5e5e5e;
}
</style>
