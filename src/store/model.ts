import { DeepReadonly } from 'utility-types';
import * as actions from './actions';
import { Observable } from 'rxjs';

export type TodoData = Readonly<{
  description: string;
  done: boolean;
}>;

export type Todo = TodoData &
  Readonly<{
    id: string;
  }>;

export type State = DeepReadonly<{
  todosMap: { [id: string]: TodoData };
  todosOrd: string[];
}>;

export type ActionMap = {
  [T in keyof typeof actions]: ReturnType<(typeof actions)[T]>;
};

export type Action = ActionMap[keyof ActionMap];

export type Api = {
  getAll: () => Observable<Todo[]>;
  post: (todo: TodoData) => Observable<Todo>;
  patch: (id: string, todo: Partial<TodoData>) => Observable<Todo>;
  delete: (id: string) => Observable<void>;
};
