import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { State, Action, Api } from './model';
import { reducer } from './reducer';
import { rootEpic } from './epics';

export const make = (api: Api) => {
  const epicMiddleware = createEpicMiddleware<Action, Action, State, Api>({
    dependencies: api
  });
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
};

export * from './selectors';
export * from './actions';
