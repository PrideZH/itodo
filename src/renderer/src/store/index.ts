import { createPinia } from 'pinia';
import { useTaskStore } from './task';
import { useAffairStore } from './affair';
import { useTodoStore } from './todo';

const pinia = createPinia();

export { useTodoStore, useAffairStore, useTaskStore }
export default pinia;
