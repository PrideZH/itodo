import { createPinia } from 'pinia';
import { useTodoStore } from './modules/todo';

const pinia = createPinia();

export { useTodoStore };
export default pinia;
