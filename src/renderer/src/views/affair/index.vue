<script setup lang="ts">
import Drawer from './components/Drawer.vue';
import ListItem from '../../components/ListItem.vue';
import { Calendar, Delete, Edit } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
import { dateFormat } from '../../utils/dateUtil';
import { useAffairStore } from '../../store';

const drawer = ref<InstanceType<typeof Drawer>>();

const affairStore = useAffairStore();
const affairs = computed(() => affairStore.getAffairs);
</script>

<template>
  <el-button @click="drawer?.open(null)">添加任务</el-button>

  <ListItem v-for="affair in affairs" :key="affair.id">
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
