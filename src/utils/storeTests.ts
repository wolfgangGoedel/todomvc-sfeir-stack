import { Store, Action as ReduxAction } from 'redux';
import { from } from 'rxjs';
import { distinctUntilChanged, skip } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

export const testState = <Action extends ReduxAction, State>(config: {
  makeStore: (api: any) => Store<State, Action>;
  actions: [string, { [marble: string]: Action }];
  state: [string, { [marble: string]: State }];
  api: { [func: string]: [string, { [marble: string]: any }] };
}) => {
  const scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  scheduler.run(h => {
    const [actionMarbles, actionValues] = config.actions;
    const action$ = h.hot(actionMarbles, actionValues);
    const api = Object.fromEntries(
      Object.entries(config.api).map(([func, [marbles, mconf]]) => [
        func,
        () => h.cold(marbles, mconf)
      ])
    );
    const store = config.makeStore(api as any);
    action$.subscribe(store.dispatch);
    const state$ = from(store as any).pipe(
      distinctUntilChanged(),
      skip(1)
    );
    const [stateMarbles, stateValues] = config.state;
    h.expectObservable(state$).toBe(stateMarbles, stateValues);
  });
};
