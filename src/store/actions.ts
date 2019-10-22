import { Todo } from './state';

export type AppReady = {
  type: 'APP_READY';
};

export type TodosReceived = {
  type: 'TODOS_RECEIVED';
  todos: Todo[];
};

export type Action = AppReady | TodosReceived;

export const appReady = (): AppReady => ({ type: 'APP_READY' });
export const todosReceived = (todos: Todo[]): TodosReceived => ({
  type: 'TODOS_RECEIVED',
  todos
});
