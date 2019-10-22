import { Reducer } from 'redux';
import { Action } from './actions';

export type Todo = {
  id: string;
  description: string;
  done: boolean;
};

export type State = {
  todos: { [id: string]: Todo };
};

const initialState: State = {
  todos: {}
};

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'TODOS_RECEIVED':
      return {
        todos: Object.fromEntries(action.todos.map(todo => [todo.id, todo]))
      };
    case 'TODO_RECEIVED':
      return {
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo
        }
      };
    default:
      return state;
  }
};
