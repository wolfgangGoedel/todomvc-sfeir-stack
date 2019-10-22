import { map, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Epic } from '.';
import { AppReady, todosReceived, TodoAdded, todoReceived } from './actions';

const appReady: Epic = (action$, _state$, api) =>
  action$
    .ofType<AppReady>('APP_READY')
    .pipe(switchMap(_ => api.loadAll().pipe(map(todosReceived))));

const addTodo: Epic = (action$, _state$, api) =>
  action$
    .ofType<TodoAdded>('TODO_ADDED')
    .pipe(
      switchMap(({ description }) =>
        api.addNew(description).pipe(map(todoReceived))
      )
    );

export const rootEpic = combineEpics(appReady, addTodo);
