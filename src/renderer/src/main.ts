import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/theme-chalk/el-message.css';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app').$nextTick(window.removeLoading)

console.log('fs', window.fs)
console.log('ipcRenderer', window.ipcRenderer)
