import { Reducer } from 'redux';
import { State, Action } from './model';

const initialState: State = {
  todosMap: {},
  todosOrd: []
};

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'TODOS_RECEIVED':
      const todos = action.todos;
      return {
        todosMap: Object.fromEntries(
          todos.map(({ id, ...todo }) => [id, todo])
        ),
        todosOrd: todos.map(({ id }) => id)
      };

    case 'TODO_RECEIVED':
      const { id, ...todo } = action.todo;
      return {
        todosMap: {
          ...state.todosMap,
          [id]: todo
        },
        todosOrd: state.todosOrd.includes(id)
          ? state.todosOrd
          : [...state.todosOrd, id]
      };

    case 'DONE_SWITCHED':
      return {
        ...state,
        todosMap: {
          ...state.todosMap,
          [action.todoId]: {
            ...state.todosMap[action.todoId],
            done: !state.todosMap[action.todoId].done
          }
        }
      };

    case 'TODO_DELETED':
      const { [action.todoId]: _, ...todosMap } = state.todosMap;
      return {
        todosMap,
        todosOrd: state.todosOrd.filter(id => id !== action.todoId)
      };

    default:
      return state;
  }
};
