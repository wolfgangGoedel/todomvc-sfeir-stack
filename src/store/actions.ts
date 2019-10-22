import { Todo } from './model';

export const AppReady = () =>
  <const>{
    type: 'APP_READY'
  };

export const TodosReceived = (todos: Todo[]) =>
  <const>{
    type: 'TODOS_RECEIVED',
    todos
  };

export const TodoAdded = (description: string) =>
  <const>{
    type: 'TODO_ADDED',
    description
  };

export const TodoReceived = (todo: Todo) =>
  <const>{
    type: 'TODO_RECEIVED',
    todo
  };

export const DoneSwitched = (todoId: string) =>
  <const>{
    type: 'DONE_SWITCHED',
    todoId
  };
