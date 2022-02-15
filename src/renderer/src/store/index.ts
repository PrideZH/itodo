import { createPinia } from 'pinia';
import { useTaskStore } from './task';
import { useAffairStore } from './affair';
import { useTodoStore } from './todo';
import { useMemoStore } from './memo';

const pinia = createPinia();

export { useTodoStore, useAffairStore, useTaskStore, useMemoStore }
export default pinia;
