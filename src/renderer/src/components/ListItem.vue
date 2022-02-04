<script setup lang="ts">

</script>

<template>
  <el-card :body-style="{padding: '12px 20px'}">
    <div class="item">
      <div class="header">
      <slot name="header" />
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </el-card >
</template>

<style scoped>
.el-card {
  margin: 8px 0;
  min-width: 400px;
}

.item {
  display: flex;
  align-items: center;
}

.body {
  flex: 1;
  padding: 0 16px;
}
</style>
