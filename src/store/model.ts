import { DeepReadonly } from 'utility-types';
import * as actions from './actions';
import { Observable } from 'rxjs';

export type Todo = Readonly<{
  id: string;
  description: string;
  done: boolean;
}>;

export type State = DeepReadonly<{
  todosMap: { [id: string]: Omit<Todo, 'id'> };
  todosOrd: string[];
}>;

export type ActionMap = {
  [T in keyof typeof actions]: ReturnType<(typeof actions)[T]>;
};

export type Action = ActionMap[keyof ActionMap];

export type Api = {
  getAll: () => Observable<Todo[]>;
  post: (todo: Omit<Todo, 'id'>) => Observable<Todo>;
  patch: (id: string, todo: Partial<Omit<Todo, 'id'>>) => Observable<Todo>;
  delete: (id: string) => Observable<void>;
};
