import { State } from './model';

export const getTodoIds = (state: State) => state.todosOrd;

export const getTodo = (id: string) => (state: State) => state.todosMap[id];
