import { createPinia } from 'pinia';
import { useTaskStore } from './modules/task';
import { useTodoStore } from './modules/todo';

const pinia = createPinia();

export { useTodoStore };
export { useTaskStore }
export default pinia;
