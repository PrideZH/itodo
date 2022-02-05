import { createPinia } from 'pinia';
import { useTaskStore } from './modules/task';
import { useAffairStore } from './modules/affair';
import { useTodoStore } from './modules/todo';

const pinia = createPinia();

export { useTodoStore, useAffairStore, useTaskStore }
export default pinia;
