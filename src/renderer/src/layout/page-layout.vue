<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { RouteRecordNormalized, useRouter } from 'vue-router';

const router = useRouter();

const rootRoute: RouteRecordNormalized = router.getRoutes().find((el) => el.name === 'root') as RouteRecordNormalized;
</script>

<template>
  <el-container class="container">
    <el-aside class="aside" width="180px">
      <!-- <div class="introduce">
        <el-avatar src="https://empty">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        Nickname
        Username
      </div> -->
      <div class="search">
        <el-input placeholder="搜索" :suffix-icon="Search" />
      </div>
      <el-menu class="menu" router>
        <el-menu-item v-for="menuItem in rootRoute.children" :key="menuItem.path" :index="`/${menuItem.path}`">
          <el-icon><svg viewBox="0 0 1024 1024">
            <path v-for="(iconSvg, index) in menuItem.meta?.icon" :key="index" fill="currentColor" :d="iconSvg"></path>
          </svg></el-icon>
          <span>{{ menuItem.meta?.locale || '' }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.container {
  height: 100%;
}

.aside {
  display: flex;
  flex-direction: column;
}

.introduce {
  margin: 8px 16px;
}

.search {
  margin: 0 16px 16px;
}

.menu {
  flex: 1;
  height: 100%;
  border-right: none;
}

.main {
  padding: 32px;
  margin: 0;
  border-radius: 8px;
  background-color: #eee;
}
</style>
