import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer, State } from './state';
import { Action, appReady } from './actions';
import { rootEpic } from './epics';

export const make = () => {
  const epicMiddleware = createEpicMiddleware<Action, Action, State>();
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
