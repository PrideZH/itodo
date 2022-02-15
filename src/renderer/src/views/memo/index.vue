<script setup lang="ts">
import { nextTick, ref } from 'vue';
import ListItem from '../../components/ListItem.vue';
import { useMemoStore } from '../../store';
import TextView from '../../components/TextView.vue';
import { Memo } from '../../types/global';

const memoStore = useMemoStore();

const content = ref<string>('');
const editIndex = ref<number | null>(null);

const addMemo = () => {
  if (content.value.trim() === '') {
    return;
  }

  memoStore.add({ id: new Date().getTime(), content: content.value });
  content.value = '';
};

const setMemo = (memo: Memo) => {
  editIndex.value = null;

  if (memo.content.trim() === '') {
    memoStore.del(memo.id);
    return;
  }

  memoStore.set(memo);
};

const clickMemo = (index: number) => {
  editIndex.value = index;
  nextTick(() => {
    const memoInput = document.getElementById('memo-input');
    if (memoInput !== null) {
      memoInput.focus();
    }
  });
};
</script>

<template>
  <ListItem>
    <el-input v-model="content" type="textarea" @blur="addMemo" @keydown.enter.ctrl="addMemo" />
  </ListItem>
  <ListItem class="item" v-for="(memo, index) in memoStore.memos" :key="memo.id" @click="clickMemo(index)">
    <el-input
      id="memo-input"
      v-if="editIndex === index"
      v-model="memo.content"
      type="textarea"
      @blur="setMemo(memo)" @keydown.enter.ctrl="setMemo(memo)"
    />
    <TextView v-else :text="memo.content" />
  </ListItem>
</template>

<style scoped>
.item {
  cursor: pointer;
}
</style>
