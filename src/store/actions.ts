import { Todo } from './state';

export type AppReady = {
  type: 'APP_READY';
};

export type TodosReceived = {
  type: 'TODOS_RECEIVED';
  todos: Todo[];
};

export type TodoAdded = {
  type: 'TODO_ADDED';
  description: string;
};

export type TodoReceived = {
  type: 'TODO_RECEIVED';
  todo: Todo;
};

export type Action = AppReady | TodosReceived | TodoAdded | TodoReceived;

export const appReady = (): AppReady => ({ type: 'APP_READY' });

export const todosReceived = (todos: Todo[]): TodosReceived => ({
  type: 'TODOS_RECEIVED',
  todos
});

export const todoAdded = (description: string): TodoAdded => ({
  type: 'TODO_ADDED',
  description
});

export const todoReceived = (todo: Todo): TodoReceived => ({
  type: 'TODO_RECEIVED',
  todo
});
