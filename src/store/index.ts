import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, Epic as EpicType } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer, State } from './state';
import { Action, appReady } from './actions';
import { rootEpic } from './epics';
import * as api from '../api';

export type Api = typeof api;
export type Epic = EpicType<Action, Action, State, Api>;

export const make = (api: Api) => {
  const epicMiddleware = createEpicMiddleware<
    Action,
    Action,
    State,
    typeof api
  >({ dependencies: api });
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);

  return store;
};

export const action = {
  appReady
};
