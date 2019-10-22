import { map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Epic, combineEpics } from 'redux-observable';
import { State } from './state';
import { Action, AppReady, todosReceived } from './actions';

type AppEpic = Epic<Action, Action, State>;

const appReady: AppEpic = action$ =>
  action$
    .ofType<AppReady>('APP_READY')
    .pipe(
      switchMap(_ =>
        ajax
          .get('//localhost:3001/api/tasks')
          .pipe(map(res => todosReceived(res.response)))
      )
    );

export const rootEpic = combineEpics(appReady);
