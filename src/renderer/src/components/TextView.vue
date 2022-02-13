<script setup lang="ts">
import { computed } from 'vue';

defineProps({ text: String });

const content = computed(() => {
  return (text: string | undefined) => {
    if (text === undefined) {
      return '';
    }
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    text = text.replace(new RegExp(/</g), '&lt;');
    text = text.replace(new RegExp(/>/g), '&gt;');
    text = text.replace(new RegExp(/ /g), '&nbsp;');
    text = text.replaceAll(/\n/g,'<br/>');
    return text.replace(reg, '<a href="javascript:void(0)" onclick=window.shell.openExternal("$1$2")>$1$2</a>');
  };
});
</script>

<template>
  <div v-html="content(text)" />
</template>
