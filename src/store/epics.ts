import { map, switchMap, mergeMap } from 'rxjs/operators';
import { combineEpics, Epic as EpicType } from 'redux-observable';
import { TodosReceived, TodoReceived, TodoDeleted } from './actions';
import { ActionMap, Action, State, Api } from './model';
import { merge } from 'rxjs';
import { getTodo } from './selectors';

type Epic = EpicType<Action, Action, State, Api>;

const appReady: Epic = (action$, _state$, api) =>
  action$
    .ofType<ActionMap['AppReady']>('APP_READY')
    .pipe(switchMap(_ => api.getAll().pipe(map(TodosReceived))));

const addTodo: Epic = (action$, _state$, api) =>
  action$
    .ofType<ActionMap['TodoAdded']>('TODO_ADDED')
    .pipe(
      switchMap(({ description }) =>
        api.post({ description, done: false }).pipe(map(TodoReceived))
      )
    );

const patchTodo: Epic = (action$, state$, api) =>
  merge(action$.ofType<ActionMap['DoneSwitched']>('DONE_SWITCHED')).pipe(
    switchMap(({ todoId }) => {
      const todo = getTodo(todoId)(state$.value);
      return api.patch(todoId, todo).pipe(map(TodoReceived));
    })
  );

const deleteTodo: Epic = (action$, _state$, api) =>
  action$
    .ofType<ActionMap['TodoRemoved']>('TODO_REMOVED')
    .pipe(
      mergeMap(({ todoId }) =>
        api.delete(todoId).pipe(map(_ => TodoDeleted(todoId)))
      )
    );

export const rootEpic = combineEpics(appReady, addTodo, patchTodo, deleteTodo);
